import React, { useState } from 'react';
import auth from '../utils/auth.js';

function Login({ handleLogin }) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }
    auth.authorize(formValue.email, formValue.password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          handleLogin(formValue.email);
          setFormValue({ email: '', password: '' });
        }
      })
      .catch(err => console.error(err));
  }

  return (
    <div className="account">
      <h1 className="account__title">Вход</h1>
      <form
        onSubmit={handleSubmit}
        className="account__form account-sign-in__form">
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formValue.email}
          onChange={handleChange}
          className="account__input"
          required />

        <input
          name="password"
          type="password"
          placeholder="Пароль"
          value={formValue.password}
          onChange={handleChange}
          className="account__input"
          required />

        <button
          type="submit"
          className="account__button-submit"
        >
          Войти
        </button>
      </form>
    </div>
  )
}

export default Login;
