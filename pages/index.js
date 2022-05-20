import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

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

const profileTitle = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const popupImages = document.querySelector('.popup-image');
const popupImagesItem = document.querySelector('.popup__img');
const popupImagesLabel = document.querySelector('.popup__label');
const formEdit = document.querySelector('.form-edit');
const formAdd = document.querySelector('.form-add');

const config = {
  inputSelector: '.form__field',
  submitButtonSelector: '.form__button',
  buttonInvalid: 'form__button-invalid',
  inputErrorClass: 'form__input_type_error'
};

const validationPopupEdit = new FormValidator(config, formEdit);
validationPopupEdit.enableValidation();

const validationPopupAdd = new FormValidator(config, formAdd);
validationPopupAdd.enableValidation();


const profile = new UserInfo(profileTitle, profileJob);


const profilePopup = new PopupWithForm('.popup-edit', (data) => {
  profile.setUserInfo(data);
});

const addPopup = new PopupWithForm('.popup-add', (data) => {
  const card = createCard(data);
  const cardItem = card.generateCard();
  cardList.addItem(cardItem);
})

addPopup._getInputValues();

const openImage = new PopupWithImage('.popup-image');

buttonEdit.addEventListener('click', () => {
  const userInfo = profile.getUserInfo();
  profilePopup.open();
})

buttonOpenPopupAdd.addEventListener('click', () => {
  addPopup.open();
})


function createCard(data) {
  const cardElement = new Card({
    data: data,
    handleCardClick: (name, link) => {
      openImage.open(name, link);
    }
  }, '.gallery-template')
  return cardElement;
}

export {popupImagesItem, popupImagesLabel, popupImages};

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item);
    const cardItem = card.generateCard();
    cardList.addItem(cardItem);
  },
}, '.gallery-template');

cardList.rendererItems();
