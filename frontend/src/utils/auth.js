class Auth {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  register(email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({ email, password })
    })
      .then(this._checkResponse)
  }

  authorize(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({ email, password })
    })
      .then(this._checkResponse)
      .then(data => {
        if (data) {
          return data;
        }
      })
  }

  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
    })
      .then(this._checkResponse)
  }
}

const auth = new Auth({
  //baseUrl: 'https://api.nosarevavs.nomoreparties.co',
  baseUrl: 'http://localhost:4000',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
});

export default auth;
