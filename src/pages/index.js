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

const buttonEdit = document.querySelector('.profile__button-edit');
const buttonOpenPopupAdd = document.querySelector('.profile__button-add');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const formEdit = document.querySelector('.form-edit');
const formAdd = document.querySelector('.form-add');
const inputName = document.querySelector('#name');
const inputJob = document.querySelector('#description');
const userName = document.querySelector('.profile__title');
const userJob = document.querySelector('.profile__description');
const userAvatar = document.querySelector('.profile__avatar');
const formAvatar = document.querySelector('.form-avatar');

const config = {
  inputSelector: '.form__field',
  submitButtonSelector: '.form__button',
  buttonInvalid: 'form__button-invalid',
  inputErrorClass: 'form__input_type_error'
};

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
profilePopup.loadingProcess(true);
  api.editUserProfile(values.name, values.description)
  .then(result => {
    profile.setUserInfo(result.name, result.about);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    profilePopup.loadingProcess(false);
  })
}
);
profilePopup.setEventListeners();


// Добавляем попап добавления новый карточки

const cardItem = new Section ({
  items: initialCards,
  renderer: (item) => {
        const card = createCard(item);
        cardList.addItem(card);
      },
    }, '.gallery__items'
)

const addPopup = new PopupWithForm('.popup-add', (values) => {
  addPopup.loadingProcess();
  api.addNewCard(values.name, values.link)
   .then(result => {
    cardItem.addItem(createCard(result));
   })
   .catch((err) => {
     console.log(err);
   })
   .finally(() => {
    addPopup.loadingProcess(false);
   })
})

addPopup.setEventListeners();

// Добавление попапа с изображением

const openImage = new PopupWithImage('.popup-image');
openImage.setEventListeners();


buttonEdit.addEventListener('click', () => {
  const userInfo = profile.getUserInfo();
  inputName.value = userInfo.name;
  inputJob.value = userInfo.job;
  profilePopup.open();
})

buttonOpenPopupAdd.addEventListener('click', () => {
  validationPopupAdd.enableValidation();
  addPopup.open();
})

// Функция создания карточки //
function createCard(data) {
  const cardElement = new Card({
    data: data,
    handleCardClick: (name, link) => {
      openImage.open(name, link);
      console.log(cardElement);
    },
    //передаем функцию для открытия попапа подтверждения удаления
    handlePopupDeleteOpen: (card) => {
      // нужно вызвать метод открытия попапа для удаления карточки
      popupDeleteCard.open(card);

    },
    handleLikeCard: () => {
      // проверяем есть ли наш лайк на карточки - если нет, устанавливаем:
      if (!cardElement._liked) {
        api.addLike(cardElement._id)
        .then(res => {

          cardElement.setLikes(res.likes.length);
          cardElement.likeStatus();

        })
      } else {
        api.deleteLike(cardElement._id)
        .then(res => {
          cardElement.setLikes(res.likes.length);
          cardElement.likeStatus();
        })
      }
    }

  }, '.gallery-template')

  return cardElement.generateCard();
}

// Иницииализируем попап - смена аватара пользователя / ПОПАП СМЕНА АВАТАРКИ

const avatarUserPopup = new PopupWithForm('.popup-avatar', (data) => {
  avatarUserPopup.loadingProcess(true);
  api.changeAvatarUser(data.link)
  .then(result => {
    profile.setAvatarUser(result.avatar);
    avatarUserPopup.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    avatarUserPopup.loadingProcess(false);
   })
})
avatarUserPopup.setEventListeners();

function openPopupEditAvatar() {
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
  userName.textContent = objUser.name;
  userJob.textContent = objUser.about;
  userAvatar.style.backgroundImage = `url('${objUser.avatar}')`;

  // Отрисовываем карточки
  const cardListItems = new Section ({
    items: objCardList,
    renderer: (item) => {
      const cardItem = createCard(item);
      cardListItems.addIconRemove();
      cardListItems.addItem(cardItem);
    }
  }, '.gallery__items');
  cardListItems.rendererItems();
})

/// Инициируем попап удаления карточки

const popupDeleteCard = new PopupRemoveCard('.popup-delete', (card) => {
  api.removeMyCard(card._id)
  .then(() => {
    card._removeCard();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    avatarUserPopup.loadingProcess(false);
   })
});

