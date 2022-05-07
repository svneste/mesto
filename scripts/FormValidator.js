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
    this._inputList = Array.from(formElement.querySelectorAll(inputSelector));
    this._submitButtonElement = formElement.querySelector(submitButtonSelector);
    this.toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this.toggleButtonState();
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

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._submitButtonElement.classList.add(this._buttonInvalid);
      this._submitButtonElement.disabled = true;

    } else {
      this._submitButtonElement.classList.remove(this._buttonInvalid);
      this._submitButtonElement.disabled = false;
    }
  }
}
