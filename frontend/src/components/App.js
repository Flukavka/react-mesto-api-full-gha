import { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRouteElement from './ProtectedRoute';
import api from "../utils/api";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import auth from '../utils/auth.js';

function App() {
  const [isEditProfilePopupOpen, setEditProfileState] = useState(false);
  const [isAddPlacePopupOpen, setAddPlaceState] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarState] = useState(false);
  const [selectedCard, setCardImageState] = useState(null);
  const [currentUser, setCurrentUserState] = useState({});
  const [cards, setCardsState] = useState([]);
  const [isLoggedIn, setLoggedState] = useState(false);
  const [email, setEmailState] = useState('');

  //определеяет успешная регистрация или нет
  const [isSuccessRegistration, isSuccessInfoTooltipStatus] = useState(false);

  //определяет открыть ли окно с инфо о регистрации
  const [isInfoTooltipOpen, setInfoTooltipOpenState] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    handleTokenCheck();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const token = localStorage.getItem('token');
      Promise.all([api.getUserInfo(token), api.getInitialCards(token)])
        .then(([userData, cards]) => {
          setCurrentUserState(userData);
          setCardsState(cards);
        })
        .catch(err => console.log(err));
    }
  }, [isLoggedIn]);

  function handleEditAvatarClick() {
    setEditAvatarState(true);
  };

  function handleEditProfileClick() {
    setEditProfileState(true);
  };

  function handleAddPlaceClick() {
    setAddPlaceState(true);
  };

  function closeAllPopups() {
    setEditAvatarState(false);
    setEditProfileState(false);
    setAddPlaceState(false);
    setCardImageState(null);

    setInfoTooltipOpenState(false);
  }

  function handleCardClick(card) {
    setCardImageState(card);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const token = localStorage.getItem('token');
    const isLiked = card.likes.some(item => item === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    (!isLiked ? api.likeCard(card, token) : api.unlikeCard(card, token))
      .then((newCard) => {
        setCardsState((cards) => cards.map((cards) => (
          (cards._id === card._id) ? newCard : cards)));
      })
      .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    const token = localStorage.getItem('token');
    const isUserCard = card.owner === currentUser._id;
    isUserCard && api.deleteCard(card, token)
      .then(() => {
        setCardsState(cards =>
          cards.filter(currentCard => currentCard._id !== card._id))
      })
      .catch(err => console.log(err));
  }

  function handleUpdateUser({ name, about }) {
    const token = localStorage.getItem('token');
    api.setUserInfo({ name, about }, token)
      .then(userData => {
        setCurrentUserState(userData);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleUpdateAvatar({ avatar }) {
    const token = localStorage.getItem('token');
    api.setUserAvatar({ avatar }, token)
      .then(userData => {
        setCurrentUserState(userData);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleAddPlaceSubmit({ name, link }) {
    const token = localStorage.getItem('token');
    api.addNewCard({ name, link }, token)
      .then(newCard => {
        setCardsState([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.error(err))
  }

  const handleLogin = (email) => {
    setLoggedState(true);
    setEmailState(email);
    navigate('/', { replace: true });
  }

  function handleExitClick() {
    setLoggedState(false);
    setEmailState('');
  }

  // проверяет наличие токена в локальном хранилище
  // при наличии, переводит на гланую страницу
  const handleTokenCheck = () => {
    const token = localStorage.getItem('token');
    if (token) {
      auth.checkToken(token)
        .then((res) => {
          if (!res) {
            return;
          }
          setLoggedState(true);
          setEmailState(res.email);
          navigate('/');
        })
        .catch(err => console.error(err))
    }
  }

  return (
    <div className="root">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          loggedIn={isLoggedIn}
          handleExitClick={handleExitClick}
          email={email}
          setCurrentUserState={setCurrentUserState}
        />

        <Routes>
          {/* login */}
          <Route path="/sign-in" element={<Login
            handleLogin={handleLogin}
          />} />

          {/* registration */}
          <Route path="/sign-up" element={<Register loggedIn={isLoggedIn}
            isSuccessInfoTooltipStatus={isSuccessInfoTooltipStatus}
            setInfoTooltipOpenState={setInfoTooltipOpenState}
          />} />

          {/* protectedRoute Main */}
          <Route path="/" element={<ProtectedRouteElement
            element={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLikeClick={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
            loggedIn={isLoggedIn} />}
          />

          {/* При переходе по любому несуществующему роуту перенаправляет */}
          <Route path='/*' element={<Navigate to="/sign-in" replace />} />
        </Routes>

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <PopupWithForm
          name="clarification"
          title="Вы уверены?"
          buttonText="Да"
        />

        <InfoTooltip
          onClose={closeAllPopups}
          isOpen={isInfoTooltipOpen}
          isSuccessRegistration={isSuccessRegistration}
          title={isSuccessRegistration
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
          alt={isSuccessRegistration
            ? "Изображение символизирующее положительное решение о регистрации"
            : "Изображение символизирующее отрицательное решение о регистрации"} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
