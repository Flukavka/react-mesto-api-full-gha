class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      body: JSON.stringify({ name, about }),
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  setUserAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify({ avatar }),
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  addNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      body: JSON.stringify({ name, link }),
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  deleteCard(card) {
    return fetch(`${this._baseUrl}/cards/${card._id}`, {
      method: 'DELETE',
      body: JSON.stringify(card),
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  likeCard(card) {
    return fetch(`${this._baseUrl}/cards/${card._id}/likes`, {
      method: 'PUT',
      body: JSON.stringify(card.likes),
      headers: this._headers
    })
      .then(this._checkResponse)
  }

  unlikeCard(card) {
    return fetch(`${this._baseUrl}/cards/${card._id}/likes`, {
      method: 'DELETE',
      body: JSON.stringify(card.likes),
      headers: this._headers
    })
      .then(this._checkResponse)
  }
}


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: '2ea75de7-9cf6-4052-aa7b-44f53981b503',
    'Content-Type': 'application/json'
  }
});

export default api;
