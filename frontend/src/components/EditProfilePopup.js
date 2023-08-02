import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, ...props }) {
  const [name, setNameState] = useState('');
  const [description, setDescriptionState] = useState('');
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setNameState(currentUser.name);
    setDescriptionState(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={e => handleSubmit(e)}
    >
      <input
        value={name || ''}
        onChange={e => setNameState(e.target.value)}
        className="popup__input popup__input_field_name"
        name="name"
        type="text"
        placeholder="Введите имя"
        minLength="2"
        maxLength="40"
        required
      />

      <span className="popup__error"></span>

      <input
        value={description || ''}
        onChange={e => setDescriptionState(e.target.value)}
        className="popup__input popup__input_field_about"
        name="about"
        type="text"
        placeholder="Введите профессию"
        minLength="2"
        maxLength="200"
        required
      />

      <span className="popup__error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
