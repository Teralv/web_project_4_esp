import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, link, name) {
    super(popupSelector);
    this._popupImage = this._popupElement.querySelector('.image-popup__image');
    this._popupTitle = this._popupElement.querySelector('.image-popup__title');
    this._link = link;
    this._name = name;
  }

  open() {
    super.open();
    this._popupImage.src = this._link;
    this._popupImage.alt = `Imagen de ${this._name}`;
    this._popupTitle.textContent = this._name;
    super.setEventListeners();
  }
}