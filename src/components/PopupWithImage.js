import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super (popupSelector);
    this.img = this._popup.querySelector('.popup__img');
    this.label = this._popup.querySelector('.popup__label');
  }

  open(name, link) {
    this.img.src = link;
    this.img.alt = name;
    this.label.textContent = name;
    super.open();
  }
}
