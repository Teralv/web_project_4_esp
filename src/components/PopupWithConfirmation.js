import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup{
  constructor({popupSelector, handleFormSubmit, submitButton}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = submitButton;
  }

  close() {
    super.close();
    this.renderLoading(false);
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Guardando...';
      this._submitButton.classList.add('popup__btn_inactive')
    } else {
      this._submitButton.textContent = 'Sí';
      this._submitButton.classList.remove('popup__btn_inactive')
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
      this.renderLoading(true);
    });
  }
}