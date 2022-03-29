const popup = document.querySelector('.popup-edit');
const openPopup = document.querySelector('.profile__button-edit');
const closePopup = popup.querySelector('.popup__close');
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

const popupAdd = document.querySelector('.popup-add');
const openPopupAdd = document.querySelector('.profile__button-add');
const popupAddClose = document.querySelector('.popupAdd__close');

let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('#name');
let jobInput = formElement.querySelector('#description');

let profileTitle = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__description');

const CardTitle = document.querySelector('#input-title');
const CardLink = document.querySelector('#input-link');
const formButtonAdd = document.querySelector('.formAdd__button');
const galleryBlock = document.querySelector('.gallery__block');

const likeButton = document.querySelector('.gallery__like-button');

const popupImage = document.querySelector('.popup_image');
const popupImageClose = document.querySelector('.popup_image__close');

function open (popupName) {
  popupName.classList.add('popup_opened');
}

function close (popupName) {
  popupName.classList.remove('popup_opened');
}

openPopup.addEventListener('click', () => open(popup));
openPopupAdd.addEventListener('click', () => open(popupAdd));

closePopup.addEventListener('click', () => close(popup));
popupAddClose.addEventListener('click', () => close(popupAdd));

popupImageClose.addEventListener('click', () => close(popupImage));

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  close(popup);
}


formElement.addEventListener('submit', formSubmitHandler);

popup.addEventListener('click', function (event) {
  if (event.target === event.currentTarget) {
    close(popup);
  }
})

openPopup.addEventListener('click', function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileJob.textContent;
  open(popup);
});

const gallery = document.querySelector('.gallery__items');




function renderItems(items) {
  const item = document.querySelector('.gallery-template').content.firstElementChild.cloneNode(true);

  item.querySelector('.gallery__title').textContent = items.name;
  item.querySelector('.gallery__images').src = items.link;

  setActions(item);

  gallery.append(item);
}

initialCards.map(renderItems);


function createCard(card) {
  console.log('Запустилась функция createCard');
  console.log(card.name);
  const item = document.querySelector('.gallery-template').content.firstElementChild.cloneNode(true);
  item.querySelector('.gallery__title').textContent = card.name;
  item.querySelector('.gallery__images').src = card.link;
  setActions(item);
  gallery.prepend(item);
}

function addCard(evt) {
  evt.preventDefault();
  console.log('Функция отработала');
  const newCard = {};
  newCard.name = CardTitle.value;
  newCard.link = CardLink.value;
  createCard(newCard);
  console.log(newCard);

}

formButtonAdd.addEventListener('click', addCard);


function like(event) {
  const todo = event.currentTarget.closest('.gallery__like-button');
  todo.classList.toggle('gallery__like-button-active');
}

function setActions(todo) {
  todo.querySelector('.gallery__like-button').addEventListener('click', like);
  todo.querySelector('.gallery__crash-button').addEventListener('click', removeCard);
  todo.querySelector('.gallery__images').addEventListener('click', openImg);
}

function removeCard(event) {
  const card = event.currentTarget.closest('.gallery__item');
  card.remove();
}

function openImg(card) {
  const img = event.currentTarget.closest('.gallery__images');
  card.
  console.log(img);
  popupImage.classList.add('popup_opened');
}
