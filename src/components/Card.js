export default class Card {
  constructor(data, cardSelector, { handleCardClick, handleDeleteClick, handleAddLike, handleRemoveLike, userID }) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likesArray = data.likes;
    this._cardLikes = this._likesArray.length;
    this._ownerId = data.owner._id;

    this._cardSelector = cardSelector;

    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleAddLike = handleAddLike;
    this._handleRemoveLike = handleRemoveLike;

    this._user = userID;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__name').textContent = this._name;
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = `Imagen de ${this._name}`;
    this._element.querySelector('.element__like-counter').textContent = this._cardLikes ? this._cardLikes : '';

    const hasUserLiked = this._likesArray.some((like) => like._id === this._user);

    this._element.querySelector('.element__heart').classList.toggle('element__heart_black', hasUserLiked);

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__heart').addEventListener('click', () => {

      const hasUserLiked = this._likesArray.some((like) => like._id === this._user);

      if (hasUserLiked) {
        this._handleRemoveLike({id: this._id});
      } else {
        this._handleAddLike({id: this._id});
      }
    });

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._openImagePopup();
    });

    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._handleDeleteClick({id: this._id});
    });

    if (this._ownerId !== this._user) {
      this._element.querySelector('.element__trash').remove();
    }
  }

  addLikeFilter() {
    this._element.querySelector('.element__heart').classList.add('element__heart_black');
    this._element.querySelector('.element__like-counter').textContent = this._likesArray.length;
  }

  removeLikeFilter() {
    this._element.querySelector('.element__heart').classList.remove('element__heart_black');
    this._element.querySelector('.element__like-counter').textContent = this._likesArray.length;
  }

  updateForZeroLikes() {
    if(this._cardLikes === 0) {
      this._element.querySelector('.element__like-counter').textContent = '';
    }
  }

  updateLikes = (resArray) => {
    this._likesArray = resArray;
    return this._likesArray;
  };

  _trashBtn() {
    this._element.querySelector('.element__trash').closest('.element').remove();
  }

  _openImagePopup() {
    this._handleCardClick({link: this._link, name: this._name});
  }
}