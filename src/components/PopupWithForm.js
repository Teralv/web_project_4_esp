import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, submitCallback }) {
    super(popupSelector);
    this._form = this._popupElement.querySelector('.form');
    this._buttonSubmit = this._popupElement.querySelector('.popup__btn')
    this._handleFormSubmit = submitCallback;
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.form__input');
    this.formValues = {};
    this._inputList.forEach((input) => {
      this.formValues[input.name] = input.value;
      console.log(this.formValues[input.name])
    });
    return this.formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
    this._popupElement.querySelector('.popup__btn').classList.add('popup__btn_inactive');
  }
}