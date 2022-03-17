const popup = document.querySelector('.popup');
const openPopup = document.querySelector('.profile__button-edit');
const closePopup = popup.querySelector('.popup__close');

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


