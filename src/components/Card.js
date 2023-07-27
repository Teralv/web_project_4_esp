export default class Card {
  constructor(data, cardSelector, { handleCardClick }) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__heart').addEventListener('click', () => {
      this._handleLikeBtn();
    });

    this._element.querySelector('.element__trash').addEventListener('click', () => {
      this._handleTrashBtn();
    });

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleOpenImagePopup();
    });
  }

  _handleLikeBtn() {
    this._element.querySelector('.element__heart').classList.toggle('element__heart_black');
  }

  _handleTrashBtn() {
    this._element.remove();
  }

  _handleOpenImagePopup() {
    this._handleCardClick(this._link, this._name);
  }
}