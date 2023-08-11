import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popupElement.querySelector('.image-popup__image');
    this._popupTitle = this._popupElement.querySelector('.image-popup__title');
  }

  open({link, name}) {
    super.open();
    this._popupImage.src = link;
    this._popupImage.alt = `Imagen de ${name}`;
    this._popupTitle.textContent = name;
    super.setEventListeners();
  }
}