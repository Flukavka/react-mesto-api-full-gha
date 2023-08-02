import React from "react";

function ImagePopup(props) {

  return (
    props.card && (
      <div className={
        `popup popup-image popup_opened`} >
        <div className="overlay overlay_opacity"></div>

        <figure className="popup-image__figure">
          <button
            onClick={props.onClose}
            type="button"
            className="popup__close popup-image__close"
            aria-label="Закрыть всплывающее окно"
          ></button>

          <img className="popup__image" src={props.card.link} alt={`Фотография ${props.card.name}`} />

          <figcaption className="popup__image-title">{props.card.name}</figcaption>
        </figure>
      </div>
    )
  )
}

export default ImagePopup;
