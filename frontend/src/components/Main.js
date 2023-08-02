import { useContext } from 'react';
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Footer from './Footer';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick,
  onCardLikeClick, onCardDelete, cards }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <main className="content container">
        {/* <!-- Начало секции profile --> */}
        <section className="profile">
          <div className="profile__info">
            <div className="profile__avatar-wrapper">
              <img
                className="profile__avatar"
                src={currentUser.avatar}
                alt="Аватар пользователя"
              />

              <button
                onClick={onEditAvatar}
                className="profile__avatar-edit"
                aria-label="Изменить аватар"
              ></button>
            </div>

            <div className="profile__user-info">
              <div className="profile__wrapper">
                <h1 className="profile__username">{currentUser.name}</h1>

                <p className="profile__profession">{currentUser.about}</p>
              </div>

              <button
                onClick={onEditProfile}
                type="submit"
                className="profile__info-edit"
                aria-label="Редактировать данные профиля"
              ></button>
            </div>
          </div>

          <button
            onClick={onAddPlace}
            type="button"
            className="profile__btn-add"
            aria-label="Добавить новое место"
          ></button>

        </section>
        {/* <!-- Конец секции profile --> */}

        {/* <!-- Начало секции elements --> */}
        <section className="elements">
          <ul className="elements__list">
            {
              cards.map((card) => (
                <Card
                  key={card._id}
                  onCardClick={onCardClick}
                  card={card}
                  onCardLikeClick={onCardLikeClick}
                  onCardDelete={onCardDelete}
                />
              ))
            }
          </ul>
        </section>
        {/* <!-- Конец секции elements --> */}
      </main>,
      <Footer />
    </>
  )
}

export default Main;
