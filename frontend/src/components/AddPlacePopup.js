import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from "react";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setNameState] = useState('');
  const [link, setLinkState] = useState('');

  useEffect(() => {
    setNameState('');
    setLinkState('')
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace(
      {
        name,
        link
      }
    )
  }

  function handleChangeNameEvent(e) {
    setNameState(e.target.value)
  }

  function handleChangeLinkEvent(e) {
    setLinkState(e.target.value)
  }

  return (
    <PopupWithForm
      name="element"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={e => handleSubmit(e)}
    >
      <input
        value={name || ''}
        onChange={handleChangeNameEvent}
        className="popup__input popup__input_field_name"
        name="name"
        type="text"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />

      <span className="popup__error"></span>

      <input
        value={link || ''}
        onChange={handleChangeLinkEvent}
        className="popup__input popup__input_field_link"
        name="link"
        type="url"
        placeholder="Ссылка на картинку"
        required
      />

      <span className="popup__error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
