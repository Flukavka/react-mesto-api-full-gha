class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
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
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`,
      },
    })
      .then(this._checkResponse)
      .catch(err => console.log(err))
  }

  //  обращается к серверу для получения данных
  //  о текущем залогиненном пользователе
  getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`,
      },
    })
      .then(this._checkResponse)
      .catch(err => console.log(err))
  }

  setUserInfo({ name, about }, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      body: JSON.stringify({ name, about }),
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`,
      },
    })
      .then(this._checkResponse)
  }

  setUserAvatar({ avatar }, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify({ avatar }),
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`,
      },
    })
      .then(this._checkResponse)
  }

  addNewCard({ name, link }, token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      body: JSON.stringify({ name, link }),
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`,
      },
    })
      .then(this._checkResponse)
  }

  deleteCard(card, token) {
    return fetch(`${this._baseUrl}/cards/${card._id}`, {
      method: 'DELETE',
      body: JSON.stringify(card),
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`,
      },
    })
      .then(this._checkResponse)
  }

  likeCard(card, token) {
    return fetch(`${this._baseUrl}/cards/${card._id}/likes`, {
      method: 'PUT',
      body: JSON.stringify(card.likes),
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`,
      },
    })
      .then(this._checkResponse)
  }

  unlikeCard(card, token) {
    return fetch(`${this._baseUrl}/cards/${card._id}/likes`, {
      method: 'DELETE',
      body: JSON.stringify(card.likes),
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`,
      },
    })
      .then(this._checkResponse)
  }
}


const api = new Api({
  //  baseUrl: 'http://localhost:4000',
  baseUrl: 'https://api.nosarevavs.nomoreparties.co',
});

export default api;
