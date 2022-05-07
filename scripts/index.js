import FormValidator from './FormValidator.js';
import Card from './Card.js';

const popupEditProfile = document.querySelector('.popup-edit');
const profileForm = document.querySelector('.form');
const popupAddCards = document.querySelector('.popup-add');
const buttonEdit = document.querySelector('.profile__button-edit');
const buttonOpenPopupAdd = document.querySelector('.profile__button-add');
const inputName = document.querySelector('#name');
const inputJob = document.querySelector('#description');
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
const formAddCard = document.querySelector('.form[name="form-add"]');
const profileTitle = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const popups = document.querySelectorAll('.popup');
const inputTitleCard = document.querySelector('#input-title');
const inputLinkCard = document.querySelector('#input-link');
const popupImages = document.querySelector('.popup-image');
const popupImagesItem = document.querySelector('.popup__img');
const popupImagesLabel = document.querySelector('.popup__label');
const formEdit = document.querySelector('.form-edit');
const formAdd = document.querySelector('.form-add');
const galleryItem = document.querySelector('.gallery__items');

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

export function openPopup (popupName) {
  popupName.classList.add('popup__opened');
  document.addEventListener('keydown', handleEscUp);
}

function closePopup (popupName) {
  document.removeEventListener('keydown', handleEscUp);
  popupName.classList.remove('popup__opened');
}

function handleProfileFormSubmit (event) {
  event.preventDefault();
  profileTitle.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupEditProfile);
}

function setInputValues () {
    inputName.value =  profileTitle.textContent;
    inputJob.value = profileJob.textContent;
    openPopup(popupEditProfile);
}

const handleEscUp = (evt) => {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup__opened');
    closePopup (activePopup);
  }
}

buttonEdit.addEventListener('click', setInputValues);
buttonOpenPopupAdd.addEventListener('click', () => openPopup(popupAddCards));
profileForm.addEventListener('submit', handleProfileFormSubmit);

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup__opened') || evt.target.classList.contains('popup__close')) {
            closePopup(popup)
        }
    })
})

const generateCard = (item) => new Card(item, '.gallery-template').generateCard();

function renderCards (items) {
  items.forEach((item) => {

    galleryItem.append(generateCard(item));
  })
}

function createNewCard() {
  const newCard = generateCard({
    name: inputTitleCard.value,
    link: inputLinkCard.value
  }, '.gallery-template');

  galleryItem.prepend(newCard);
  closePopup(popupAddCards);
  inputTitleCard.value = '';
  inputLinkCard.value = '';
}


formAddCard.addEventListener('submit', createNewCard);
renderCards(initialCards);

export {popupImagesItem, popupImagesLabel, popupImages};
