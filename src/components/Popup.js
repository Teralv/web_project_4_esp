export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if(evt.key === 'Escape') {
      return this.close();
    }
  }

  _handleOutsideClick(evt) {
    if(evt.target.classList.contains('popup__section') || evt.target.classList.contains('popup__background')) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.querySelector('.popup__close-btn').addEventListener('click', () => {
      this.close();
    })

    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });

    this._popupElement.addEventListener('click', (evt) => {
      this._handleOutsideClick(evt);
    });
  }
}