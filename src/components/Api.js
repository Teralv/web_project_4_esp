export default class Api {
  constructor({baseURL, headers}) {
    this._baseURL = baseURL;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(`${this._baseURL}/cards`, {
      method: "GET",
      headers: this._headers
    })
      .then((res) => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      });
  }

  addNewCard(name, link) {
    return fetch(`${this._baseURL}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then((res) => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      });
  }

  deleteCard(cardID) {
    return fetch(`${this._baseURL}/cards/${cardID}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      });
  }

  getUserInfo() {
    return fetch(`${this._baseURL}/users/me`, {
      method: "GET",
      headers: this._headers
    })
      .then((res) => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      });
  }

  editProfileInfo(name, about) {
    return fetch(`${this._baseURL}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then((res) => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      });
  }

  addLike(cardID) {
    return fetch(`${this._baseURL}/cards/likes/${cardID}`, {
      method: "PUT",
      headers: this._headers
    })
      .then((res) => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      });
  }

  deleteLike(cardID) {
    return fetch(`${this._baseURL}/cards/likes/${cardID}`, {
      method: "DELETE",
      headers: this._headers
    })
      .then((res) => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      });
  }

  avatarImage(link) {
    return fetch(`${this._baseURL}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    })
      .then((res) => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      });
  }
}