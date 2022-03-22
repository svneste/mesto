const popup = document.querySelector('.popup');
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
let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('#name');
let jobInput = formElement.querySelector('#description');

let profileTitle = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__description');

function togglePopup() {
  popup.classList.toggle('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  togglePopup();
}

closePopup.addEventListener('click', togglePopup);
formElement.addEventListener('submit', formSubmitHandler);

popup.addEventListener('click', function (event) {
  if (event.target === event.currentTarget) {
    togglePopup();
  }
})

openPopup.addEventListener('click', function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileJob.textContent;
  togglePopup();
});

const gallery = document.querySelector('.gallery__items');



function renderItems(items) {
  const item = document.querySelector('.gallery-template').content.firstElementChild.cloneNode(true);

  item.querySelector('.gallery__title').textContent = items.name;
  item.querySelector('.gallery__images').src = items.link;

  gallery.append(item);
}

initialCards.map(renderItems);
