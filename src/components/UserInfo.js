export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector, userID }) {
    this._username = nameSelector;
    this._about = aboutSelector;
    this._avatarSelector =  avatarSelector;
    this._userID = userID;

    this._nameInput = document.querySelector('#name-input');
    this._aboutInput = document.querySelector('#about-input');
  }

  getUserInfo() {
    return {
      name: this._nameInput.value,
      about: this._jobInput.value,
    };
  }

  setUserInfo(data) {
    const {username, about} = data
    this._username.textContent = username;
    this._about.textContent = about;
  }

  setUserAvatar(avatar) {
    this._avatarSelector.src = avatar
  }
}