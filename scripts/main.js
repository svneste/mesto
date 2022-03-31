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
const gallery = document.querySelector('.gallery__items');
const profileTitle = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const closeButtons = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');
const inputTitleCard = document.querySelector('#input-title');
const inputLinkCard = document.querySelector('#input-link');
const galleryImg = document.querySelector('.gallery__images');
const popupImages = document.querySelector('.popup-image');
const popupImagesItem = document.querySelector('.popup__img');
const popupImagesLabel = document.querySelector('.popup__label');
const galleryImagesTitle = document.querySelector('.gallery__title');

function openPopup (popupName) {
  popupName.classList.add('popup__opened');
}

function closePopup (popupName) {
  popupName.classList.remove('popup__opened');
}

function handleProfileFormSubmit (event) {
  event.preventDefault();
  profileTitle.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupEditProfile);
}

function setInputValues () {
    openPopup(popupEditProfile);
    inputName.value =  profileTitle.textContent;
    inputJob.value = profileJob.textContent;
}

buttonEdit.addEventListener('click', setInputValues);
buttonOpenPopupAdd.addEventListener('click', () => openPopup(popupAddCards));
profileForm.addEventListener('submit', handleProfileFormSubmit);

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup__opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
          closePopup(popup)
        }
    })
})

popupAddCards.addEventListener('submit', createNewCard);

function renderItems (data) {
  const item = createCard(data);
  gallery.prepend(item);
}

function createCard(item) {
  const cardElement = document.querySelector('.gallery-template').content.firstElementChild.cloneNode(true);
  const imagesGallery = cardElement.querySelector('.gallery__images');
  cardElement.querySelector('.gallery__title').textContent = item.name;
  imagesGallery.src = item.link;
  imagesGallery.alt = item.name;
  setCardListeners(cardElement);
  return cardElement;
}

initialCards.map(renderItems);

function createNewCard (event) {
  event.preventDefault();
  const res = {};

  res.name = inputTitleCard.value;
  res.link = inputLinkCard.value;
  closePopup(popupAddCards);
  renderItems(res);
  inputTitleCard.value = '';
  inputLinkCard.value = '';
}

function toggleLike (event) {
  event.currentTarget.classList.toggle('gallery__like-button-active');
}

function removeCard (event) {
  const card = event.currentTarget.closest('.gallery__item');
  card.remove();
}

function openImages (event) {
  popupImagesItem.src = event.currentTarget.src;
  popupImagesItem.alt = event.currentTarget.alt;
  popupImagesLabel.textContent = event.currentTarget.alt;
  openPopup(popupImages);
}

function setCardListeners(card) {
  card.querySelector('.gallery__like-button').addEventListener('click', toggleLike);
  card.querySelector('.gallery__crash-button').addEventListener('click', removeCard);
  card.querySelector('.gallery__images').addEventListener('click', openImages);
}
