import React from "react";

function PopupWithForm({ name, title, buttonText, isOpen, onClose, onSubmit, ...props }) {
  return (
    <div className={isOpen
      ? `popup popup-${name} popup_opened`
      : `popup popup-${name}`}>
      <div className="overlay"></div>

      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>

        <form className={`popup__form popup-${name}__form`} name={name} onSubmit={onSubmit} noValidate>
          {props.children}
          <button
            type="submit"
            className={`popup__btn-save popup__button popup-${name}__btn-save`}
          >
            {buttonText}
          </button>
        </form>
      </div>

      <button
        onClick={onClose}
        type="button"
        className={`popup__close popup__close-${name}`}
        aria-label="Закрыть всплывающее окно"
      ></button>
    </div >
  )
}

export default PopupWithForm;
