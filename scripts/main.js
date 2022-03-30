const popupContainer = document.querySelector('.popup');
const popupEditProfile = document.querySelector('.popup-edit');
const popupSubmitButton = document.querySelector('.form__button');
const formContainer = document.querySelector('.form');
const popupAddCards = document.querySelector('.popup-add');
const popupImage = document.querySelector('.popup-image');
const buttonEdit = document.querySelector('.profile__button-edit');
const buttonCloseEditPopup = document.querySelector('.popup__close');
const buttonOpenPopupAdd = document.querySelector('.profile__button-add');
const buttonClosePopupAdd = document.querySelector('.popupAdd__close');
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
const gallery = document.querySelector('.gallery__items');
let profileTitle = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__description');
const buttonCloseAllPopup = document.querySelectorAll('.popup__close');
const popupContainerAll = document.querySelectorAll('.popup');
let inputTitleCard = document.querySelector('#input-title');
let inputLinkCard = document.querySelector('#input-link');
const buttonAddNewCard = document.querySelector('.formAdd__button');
const galleryImg = document.querySelector('.gallery__images');
const popupImages = document.querySelector('.popup-image');
const popupImagesItem = document.querySelector('.popup__img');
const popupImagesLabel = document.querySelector('.popup__label');
const galleryImagesTitle = document.querySelector('.gallery__title');

function openPopup (popupName) {
  popupName.classList.add('popup_opened');
}

function closePopup (popupName) {
  popupName.classList.remove('popup_opened');
}

function closePopupContainer (popupName) {
  if (event.target === event.currentTarget) {

    closePopup(popupName);
  }
}

function formSubmitHandler (event) {
  event.preventDefault();
  profileTitle.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupContainer);
}

function inputGetValue () {
    inputName.value =  profileTitle.textContent;
    inputJob.value = profileJob.textContent;
}

buttonEdit.addEventListener('click', () => openPopup(popupEditProfile));
buttonEdit.addEventListener('click', inputGetValue);
buttonOpenPopupAdd.addEventListener('click', () => openPopup(popupAddCards));
formContainer.addEventListener('submit', formSubmitHandler);

buttonCloseAllPopup.forEach(function(item) {
  item.addEventListener('click', () => closePopup(item.closest('.popup')));
});

popupContainerAll.forEach(function(item) {
  item.addEventListener('click', () => closePopupContainer(item));
});


popupAddCards.addEventListener('submit', createNewCard);

function renderItems (items) {
  const item = document.querySelector('.gallery-template').content.firstElementChild.cloneNode(true);
  item.querySelector('.gallery__title').textContent = items.name;
  item.querySelector('.gallery__images').src = items.link;
  item.querySelector('.gallery__images').alt = items.name;

  setActions(item);
  gallery.prepend(item);
  closePopup(popupAddCards);
}

initialCards.map(renderItems);

function createNewCard (event) {
  event.preventDefault();
  let res = {};

  res.name = inputTitleCard.value;
  res.link = inputLinkCard.value;

  renderItems(res);

}

function addLike (event) {
  const likeButton = event.currentTarget.closest('.gallery__like-button');
  likeButton.classList.toggle('gallery__like-button-active');
}

function removeCard (event) {
  const card = event.currentTarget.closest('.gallery__item');
  card.remove();
}

function openImages (event) {
  const images  = event.currentTarget.closest('.gallery__images');

  const title = images.closest('.gallery__item').querySelector('.gallery__title');

  popupImagesItem.src = images.src;
  popupImagesLabel.textContent = title.textContent;

  openPopup(popupImages);
}

function setActions(card) {
  card.querySelector('.gallery__like-button').addEventListener('click', addLike);
  card.querySelector('.gallery__crash-button').addEventListener('click', removeCard);
  card.querySelector('.gallery__images').addEventListener('click', openImages);
}
