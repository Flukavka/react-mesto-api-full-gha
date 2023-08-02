import { Link, useLocation } from 'react-router-dom';

function Header({ loggedIn, handleExitClick, email }) {
  const location = useLocation();

  const handleLinkClick = () => {
    localStorage.removeItem('token');
    handleExitClick();
  }

  return (
    <header className="header container">
      <a
        className="logo"
        href="./index.html"
        aria-label="Ссылка на главную страницу"
      > </a>
      <ul className="header__nav">
        {loggedIn ? (
          <>
            <li className="header__nav-email">{email}</li>
            <li>
              <Link
                to="/sign-in"
                className="header__nav-link"
                onClick={handleLinkClick}
              >
                Выйти
              </Link>
            </li>
          </>
        ) : (
          <>
            {location.pathname === "/sign-in"
              &&
              <li>
                <Link
                  to="/sign-up" className="header__nav-link header__nav-link_color_white">
                  Регистрация
                </Link>
              </li>}
            {location.pathname === "/sign-up"
              &&
              <li>
                <Link to="/sign-in" className="header__nav-link header__nav-link_color_white">
                  Войти
                </Link>
              </li>}
          </>
        )
        }
      </ul>

    </header >
  )
}

export default Header;
