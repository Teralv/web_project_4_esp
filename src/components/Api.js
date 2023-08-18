const ENDPOINTS = {
  CARDS: '/cards',
  USER: '/users/me',
  USER_AVATAR: '/users/me/avatar',
  CARDS_LIKES: '/cards/likes'
}

export default class Api {
  constructor({baseURL, headers}) {
    this._baseURL = baseURL;
    this._headers = headers;
  }

  async _sendRequest(endpoint, method, body) {
    const config = {
      method: method,
      headers: this._headers
    }

    if (body) {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(`${this._baseURL}${endpoint}`, config);

    if (response.ok) {
      return response.json();
    }
    throw new Error(`Error: ${response.status}`);
  }

  getInitialCards() {
    return this._sendRequest(ENDPOINTS.CARDS, 'GET');
  }

  addNewCard(name, link) {
    return this._sendRequest(ENDPOINTS.CARDS, 'POST', { name, link });
  }

  deleteCard(cardID) {
    return this._sendRequest(ENDPOINTS.CARDS + `/${cardID}`, 'DELETE');
  }

  getUserInfo() {
    return this._sendRequest(ENDPOINTS.USER, 'GET');
  }

  editProfileInfo(name, about) {
    return this._sendRequest(ENDPOINTS.USER, 'PATCH', { name, about });
  }

  addLike(cardID) {
    return this._sendRequest(ENDPOINTS.CARDS_LIKES + `/${cardID}`, 'PUT');
  }

  deleteLike(cardID) {
    return this._sendRequest(ENDPOINTS.CARDS_LIKES + `/${cardID}`, 'DELETE');
  }

  avatarImage(avatar) {
    return this._sendRequest(ENDPOINTS.USER_AVATAR, 'PATCH', { avatar });
  }
}