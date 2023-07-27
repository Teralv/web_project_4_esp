export default class UserInfo {
  constructor({ nameSelector, aboutSelector }) {
    this._username = nameSelector;
    this._about = aboutSelector;

    this._nameInput = document.querySelector('#name-input');
    this._aboutInput = document.querySelector('#about-input');
  }

  getUserInfo() {
    return {
      name: this._nameInput.value,
      about: this._jobInput.value,
    };
  }

  setUserInfo() {
    this._username.textContent = this._nameInput.value;
    this._about.textContent = this._aboutInput.value;
  }
}