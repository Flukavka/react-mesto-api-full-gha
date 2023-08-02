import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../utils/auth.js';


function Register({ isSuccessInfoTooltipStatus, setInfoTooltipOpenState }) {
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValue.email !== '' && formValue.password !== '') {
      auth.register(formValue.email, formValue.password)
        .then((res) => {
          isSuccessInfoTooltipStatus(true);
          setInfoTooltipOpenState(true);
          navigate('/sign-in', { replace: true });
        })
        .catch((err) => {
          isSuccessInfoTooltipStatus(false);
          setInfoTooltipOpenState(true);
          console.error(err)
        });
    }
  };

  return (
    <div className="account">
      <h1 className="account__title">Регистрация</h1>
      <form
        className="account__form account-sign-up__form"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formValue.email}
          onChange={handleChange}
          className="account__input"
          required />

        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={formValue.password}
          onChange={handleChange}
          className="account__input"
          required />

        <button
          type="submit"
          className="account__button-submit"
        >
          Зарегистрироваться
        </button>
      </form>

      <p className="account__clarification">Уже зарегистрированы? <Link
        to="/sign-in"
        className="account__clarification-link">
        Войти</Link>
      </p>
    </div>
  )
}

export default Register;
