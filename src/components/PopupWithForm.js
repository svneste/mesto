import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor (popupSelector, handleFormSubmit) {
   super(popupSelector);
   this._popup = document.querySelector(popupSelector);
   this._form = this._popup.querySelector('.form');
   this._inputs = this._form.querySelectorAll('.form__field');
   this._handleFormSubmit = handleFormSubmit;
  }

  // собирает данные всех полей формы
  _getInputValues() {
    this._formValues = {};
    this._inputs.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  _submitForm = (evt) => {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
    this.close();
  }

  // добавляет обработчик клика иконке закрытия и добавляет обработчик сабмита формы
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitForm);
  }

  // при закрытии попапа форма должна сбрасываться
  close = () => {
    super.close();
    this._form.reset();
  }
}
