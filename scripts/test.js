
function enableValidation (config) {
  const formList = Array.from(document.querySelectorAll(config.popupForm));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, config);
  })
}

function setEventListeners (formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));

  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

// function showInputError (formElement, inputElement, errorMessage, config) {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   errorElement.textContent = errorMessage;
//   inputElement.classList.add(config.inputErrorClass);
// }

// function hideInputError (formElement, inputElement, config) {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   errorElement.textContent = '';
//   inputElement.classList.remove(config.inputErrorClass);
// }

const isValid = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function toggleButtonState (inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.buttonInvalid);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.buttonInvalid);
    buttonElement.disabled = false;
  }
}

enableValidation ({
  popupForm: '.form',
  inputSelector: '.form__field',
  submitButtonSelector: '.form__button',
  buttonInvalid: 'form__button-invalid',
  inputErrorClass: 'form__input_type_error'
});
