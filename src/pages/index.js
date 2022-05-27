import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupRemoveCard from '../components/PopupRemoveCard.js';

import '../pages/index.css';

import {
  buttonEdit,
  buttonOpenPopupAdd,
  formEdit,
  formAdd,
  inputName,
  inputJob,
  userAvatar,
  formAvatar,
  config,
  gallery
} from '../utils/constants.js';

// Подключениие валидации форм

const validationPopupEdit = new FormValidator(config, formEdit);
validationPopupEdit.enableValidation();

const validationPopupAdd = new FormValidator(config, formAdd);
validationPopupAdd.enableValidation();

const validationPopupAvatar = new FormValidator(config, formAvatar);
validationPopupAvatar.enableValidation();

// Создаем класс пользователя
const profile = new UserInfo('.profile__title', '.profile__description', '.profile__avatar');

// Создаем попап для редактирования данных пользователя / ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ

const profilePopup = new PopupWithForm('.popup-edit', (values) => {
profilePopup.renderLoading(true);
  api.editUserProfile(values.name, values.description)
  .then(result => {

    profile.setUserInfo(result.name, result.about);

    profilePopup.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    profilePopup.renderLoading(false);
  })
}
);
profilePopup.setEventListeners();


// Добавление попапа с изображением

const openImage = new PopupWithImage('.popup-image');
openImage.setEventListeners();


buttonEdit.addEventListener('click', () => {
  const userInfo = profile.getUserInfo();
  inputName.value = userInfo.name;
  inputJob.value = userInfo.job;
  validationPopupEdit.resetValidation();
  profilePopup.open();
})

// Иницииализируем попап - смена аватара пользователя / ПОПАП СМЕНА АВАТАРКИ

const avatarUserPopup = new PopupWithForm('.popup-avatar', (data) => {
  avatarUserPopup.renderLoading(true);
  api.changeAvatarUser(data.link)
  .then(result => {
    profile.setAvatarUser(result.avatar);
    avatarUserPopup.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    avatarUserPopup.renderLoading(false);
   })
})
avatarUserPopup.setEventListeners();

function openPopupEditAvatar() {
  validationPopupAvatar.resetValidation();
  avatarUserPopup.open();
}

// Устанавливаем слушатель на иконку редактирования аватара

userAvatar.addEventListener('click', openPopupEditAvatar);


// Создаем класс для работы с API

const api = new Api ({
  url: 'https://mesto.nomoreparties.co/v1/cohort-41',
  headers: {
    Authorization: '52b38323-31d5-410e-bc4e-08f257105694',
    "content-type": "application/json"
  }
})

// 1. Получаем информацию о пользователе и отрисовываем карточки

Promise.all([api.getUserInfo(), api.getAllCards()]).then(([ objUser, objCardList ]) => {
  // Добавляем на страницу данные пользователя

  profile.setUserInfo(objUser.name, objUser.about);
  profile.setAvatarUser(objUser.avatar);


  // Отрисовываем карточки
  const cardListItems = new Section ({
    renderer: (items) => {
      items.forEach((item) => {
       cardListItems.appendItem(createCard(item));
      })
    }
  }, '.gallery__items');
  cardListItems.rendererItems(objCardList);

  // Функция создания карточки //
function createCard(data) {

  const cardElement = new Card({
    data: data,
    userID: objUser._id,
    handleCardClick: (name, link) => {
      openImage.open(name, link);
      //console.log(cardElement);
    },
    //передаем функцию для открытия попапа подтверждения удаления
    handlePopupDeleteOpen: (card) => {
      // нужно вызвать метод открытия попапа для удаления карточки
      popupDeleteCard.open(card);

    },
    handleLikeCard: () => {
      // проверяем есть ли наш лайк на карточки - если нет, устанавливаем:

      if (!cardElement.liked) {
        api.addLike(cardElement._id)
        .then(res => {

          cardElement.setLikes(res.likes.length);
          cardElement.likeStatus();

        })
        .catch((err) => {
          console.log(err);
        })
      } else {
        api.deleteLike(cardElement._id)
        .then(res => {
          cardElement.setLikes(res.likes.length);
          cardElement.likeStatus();
        })
        .catch((err) => {
          console.log(err);
        })
      }
    }

  }, '.gallery-template')

  return cardElement.generateCard();
}

  const addPopup = new PopupWithForm('.popup-add', (values) => {
    addPopup.renderLoading(true);
    api.addNewCard(values.name, values.link)
     .then(result => {
      cardListItems.addItem(createCard(result));
      addPopup.close();
     })
     .catch((err) => {
       console.log(err);
     })
     .finally(() => {
      addPopup.renderLoading(false);
     })
  })

  addPopup.setEventListeners();

  buttonOpenPopupAdd.addEventListener('click', () => {
    validationPopupAdd.resetValidation();
    addPopup.open();
  })
})
.catch((err) => {
  console.log(err);
})

/// Инициируем попап удаления карточки

const popupDeleteCard = new PopupRemoveCard('.popup-delete', (card) => {
  api.removeMyCard(card._id)
  .then(() => {
    card.removeCard();
    popupDeleteCard.close();
  })
  .catch((err) => {
    console.log(err);
  })
});

popupDeleteCard.setEventListeners();


