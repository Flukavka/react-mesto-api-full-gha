import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLikeClick, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(item => item._id === currentUser._id);
  const cardLikeButtonClassName = (
    `element__btn ${isLiked && 'element__btn_active'}`
  );

  function handleClick() {
    onCardClick(card);
  };

  function handleLike() {
    onCardLikeClick(card);
  };

  function handleDelete() {
    onCardDelete(card);
  }

  return (
    <li className="element">
      <img
        onClick={handleClick}
        className="element__image"
        src={card.link}
        alt={`Фотография ${card.name}`} />

      <button
        className={isOwn
          ? `element__btn-delete`
          : `element__btn-delete element__btn-delete_deactivated`}
        onClick={handleDelete}
        type="button"
        aria-label="Кнопка удаления карточки"
      ></button>

      <div className="element__description">
        <h2 className="element__title">{card.name}</h2>

        <div className="element__like">
          <button
            onClick={handleLike}
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Кнопка лайк"
          ></button>

          <span className="element__like-count">{card.likes.length}</span>
        </div>
      </div>
    </li>
  )
};

export default Card;
