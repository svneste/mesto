
export default class Card {
  constructor({data, userID, handleCardClick, handlePopupDeleteOpen, handleLikeCard}, cardSelector) {
    this.liked = false;

    data.likes.forEach((item) => {
      if (item._id === userID) {
        this.liked = true;
      }
    })
    this._userID = userID;
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._like = data.likes.length;
    this._owner = data.owner;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._id = data._id;
    this._handlePopupDeleteOpen = handlePopupDeleteOpen;
    this._handleLikeCard = handleLikeCard;
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
    this._placeLike = this._element.querySelector('.gallery__like-count');
    this._removeIcon = this._element.querySelector('.gallery__crash-button');
    this._setEventListener();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._placeLike.textContent = this._like;

    if (this.liked) {
      this._likeButton.classList.add('gallery__like-button-active');
    }

    if (this._owner._id == this._userID) {
      this._removeIcon.classList.add('gallery__crash-button-owner');
    }

    return this._element;
    }

  _setEventListener() {
    this._likeButton.addEventListener('click', () => {
      this._toggleLike();
    })

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    })

    this._removeIcon.addEventListener('click', () => {
      this._handlePopupDeleteOpen(this);
    })
  }

    _toggleLike() {
      this._likeButton.classList.toggle('gallery__like-button-active');
      this._handleLikeCard();
    }

    removeCard = () => {
    this._element.remove();
    this._element = null;
    }

    setLikes(countLikes) {
      this._like = countLikes;
      this._placeLike.textContent = this._like;
    }

    likeStatus() {
      this.liked = !this.liked;
    }
}
