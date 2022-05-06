import {popupImagesItem, popupImagesLabel, popupImages} from './index.js';
import {openPopup} from './index.js';

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

    _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.gallery__item').cloneNode(true);
    return cardElement;
    }


    generateCard() {
    this._element = this._getTemplate();
    this._setEventListener();

    this._element.querySelector('.gallery__images').src = this._link;
    this._element.querySelector('.gallery__title').textContent = this._name;

    return this._element;
    }

  _setEventListener() {
    this._element.querySelector('.gallery__like-button').addEventListener('click', () => {
      this._toggleLike();
    })

    this._element.querySelector('.gallery__crash-button').addEventListener('click', () => {
      this._removeCard();
    })

    this._element.querySelector('.gallery__images').addEventListener('click', () => {
      this._openImages();
    })
  }

    _toggleLike() {
    this._element.querySelector('.gallery__like-button').classList.toggle('gallery__like-button-active');
    }

    _removeCard = () => {
    this._element.remove();
    }

    _openImages = () => {
      popupImagesItem.src = this._link;
      popupImagesItem.alt = this._name;
      popupImagesLabel.textContent = this._name;
      popupImages.classList.add('popup__view');
      openPopup(popupImages);
    }
}
