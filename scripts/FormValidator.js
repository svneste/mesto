export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._inputSelector = config.inputSelector;
    this._buttonInvalid = config.buttonInvalid;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inputErrorClass = config.inputErrorClass;
    this._formElement = formElement;
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    this._setEventListeners(this._formElement, this._inputSelector, this._submitButtonSelector);
  }

  _setEventListeners = (formElement, inputSelector, submitButtonSelector) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const submitButtonElement = formElement.querySelector(submitButtonSelector);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState(inputList, submitButtonElement, this._buttonInvalid);
      })
    })
  }

  _isValid = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(this._formElement, inputElement, inputElement.validationMessage, this._inputErrorClass);
    } else {
      this._hideInputError(this._formElement, inputElement, this._inputErrorClass);
    }
  }

  _showInputError = (formElement, inputElement, validationMessage, inputErrorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = validationMessage;
    inputElement.classList.add(inputErrorClass);
  }

  _hideInputError = (formElement, inputElement, inputErrorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = '';
    inputElement.classList.remove(inputErrorClass);
  }

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _toggleButtonState = (inputList, submitButtonElement, buttonInvalid) => {
    if (this._hasInvalidInput(inputList)) {
      submitButtonElement.classList.add(buttonInvalid);
      submitButtonElement.disabled = true;

    } else {
      submitButtonElement.classList.remove(buttonInvalid);
      submitButtonElement.disabled = false;
    }
  }
}
