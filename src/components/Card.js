
export default class Card {
  constructor({data, handleCardClick}, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

    _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.gallery__item').cloneNode(true);
    return cardElement;
    }

    generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.gallery__images');
    this._likeButton = this._element.querySelector('.gallery__like-button');
    this._cardTitle = this._element.querySelector('.gallery__title');
    this._setEventListener();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    return this._element;
    }

  _setEventListener() {
    this._likeButton.addEventListener('click', () => {
      this._toggleLike();
    })

    this._element.querySelector('.gallery__crash-button').addEventListener('click', () => {
      this._removeCard();
    })

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    })
  }

    _toggleLike() {
      this._likeButton.classList.toggle('gallery__like-button-active');
    }

    _removeCard = () => {
    this._element.remove();
    this._element = null;
    }

}
