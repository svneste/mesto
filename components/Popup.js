export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupSelector = popupSelector;
  }

  open() {
   document.querySelector(this._popupSelector).classList.add('popup__opened');
   this.setEventListeners();
  }

  close() {
    document.querySelector(this._popupSelector).classList.remove('popup__opened');
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleButtonClose = () => {
    this.close();
  }

  setEventListeners() {
    document.querySelector(this._popupSelector).querySelector('.popup__close').addEventListener('click', this.close);
    document.addEventListener('keydown', this._handleEscClose);
    document.querySelector(this._popupSelector).addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup__opened') || evt.target.classList.contains('popup__close')) {
        this.close();
      }
    })
  }
}
