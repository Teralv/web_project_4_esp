export default class Card {
  constructor(data, cardSelector) {
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._link = data.link;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__name').textContent = this._name;
    this._element.querySelector('.element__image').src = this._link;

    return this._element;
  }

  _createNewCard(placeValue, imageValue) {
    this._element.querySelector('.element__name').textContent = placeValue;
    this._element.querySelector('.element__image').src = imageValue;

    this.generateCard()
  }

  _setEventListeners() {
    this._element.querySelector('.element__heart').addEventListener('click', () => {
      this._handleLikeBtn();
    })

    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._handleTrashBtn();
    })

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleOpenImagePopup();
    })

    document.querySelector('.image-popup__close-btn').addEventListener('click', () => {
      this._handleCloseImagePopup();
    })
  }

  _handleLikeBtn() {
    this._element.querySelector('.element__heart').classList.toggle('element__heart_black');
  }

  _handleTrashBtn() {
    this._element.remove();
  }

  _handleOpenImagePopup() {
    document.querySelector('.image-popup__title').textContent = this._name;
    document.querySelector('.image-popup__image').src = this._link;
    document.querySelector('.image-popup__image').alt = `Imagen de ${document.querySelector('.image-popup__title').textContent}`;

    document.querySelector('#image-popup').classList.add('popup_opened');
  }

  _handleCloseImagePopup() {
    document.querySelector('#image-popup').classList.remove('popup_opened');
  }
}