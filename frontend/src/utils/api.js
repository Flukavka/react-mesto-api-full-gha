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

  //  обращается к серверу для получения карточкек из базы
  getInitialCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
      headers: {
        'Аuthorization': `${token}`,
        'Content-Type': 'application/json',
      }
    })
      .then(this._checkResponse)
  }

  //  обращается к серверу для получения данных
  //  о текущем залогиненном пользователе
  getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      headers: {
        'Аuthorization': `${token}`,
        'Content-Type': 'application/json',
      }
    })
      .then(this._checkResponse)
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      body: JSON.stringify({ name, about }),
      credentials: 'include',
      headers: this._headers,
    })
      .then(this._checkResponse)
  }

  setUserAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify({ avatar }),
      credentials: 'include',
      headers: this._headers,
    })
      .then(this._checkResponse)
  }

  addNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      body: JSON.stringify({ name, link }),
      credentials: 'include',
      headers: this._headers,
    })
      .then(this._checkResponse)
  }

  deleteCard(card) {
    return fetch(`${this._baseUrl}/cards/${card._id}`, {
      method: 'DELETE',
      body: JSON.stringify(card),
      credentials: 'include',
      headers: this._headers,
    })
      .then(this._checkResponse)
  }

  likeCard(card) {
    return fetch(`${this._baseUrl}/cards/${card._id}/likes`, {
      method: 'PUT',
      body: JSON.stringify(card.likes),
      credentials: 'include',
      headers: this._headers,
    })
      .then(this._checkResponse)
  }

  unlikeCard(card) {
    return fetch(`${this._baseUrl}/cards/${card._id}/likes`, {
      method: 'DELETE',
      body: JSON.stringify(card.likes),
      credentials: 'include',
      headers: this._headers,
    })
      .then(this._checkResponse)
  }
}


const api = new Api({
  baseUrl: 'http://localhost:4000',
  headers: {
    /* authorization: '2ea75de7-9cf6-4052-aa7b-44f53981b503', */
    'Content-Type': 'application/json'
  }
});

export default api;
