import Popup from './Popup.js';

export default class PopupRemoveCard extends Popup {
  constructor (popupSelector, handleDeleteCard) {
    super(popupSelector);
    this._form = this._popup.querySelector('.form-delete');
    this._buttonPopupDeleteCard = this._form.querySelector('.form__button-delete');
    //this._id = id;
    this._handleDeleteCard = handleDeleteCard;
  }

  open(card) {
    this._card = card;
    super.open();
    this.setEventListeners();
  }

  _submitFormDelete = (evt) => {
    evt.preventDefault();
    this._handleDeleteCard(this._card);
    console.log(this._card);
    this.close()
  }

  setEventListeners() {
    super.setEventListeners();
    console.log(this._buttonPopupDeleteCard);
    this._buttonPopupDeleteCard.addEventListener('click', this._submitFormDelete);
}

}
