import './Header.scss';
import { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, Navbar } from 'react-bootstrap';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoMain from '../../assets/images/logoMain.png';
import logoUser from '../../assets/images/logoUser.png';
import logoCart from '../../assets/images/logoCart.png';
import logoConnexion from '../../assets/images/connexion.png';
import logoDeconnexion from '../../assets/images/deconnexion.png';
import { setSearchValue } from '../../actions/header';
import {
  setActivPage,
  setCurrentButtonId,
  setLink,
} from '../../actions/profil';
import { setConnectedUser, setInvitedUser, setTokenUser } from '../../actions/user';
import { clearRecipes } from '../../actions/favorites';

function Header() {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [screenWidth, setScreenWidth] = useState(false);
  const [scrollbarOn, setscrollbarOn] = useState(false);
  const [closingButton, setClosingButton] = useState(false);
  const [searchBarValue, setSearchBarValue] = useState('');
  const nickname = useSelector((state) => state.user.nicknameUser);
  const isInvited = JSON.parse(localStorage.getItem('invitedUser'));
  const isWidthTrue = useSelector((state) => state.profil.isTrueWidth);
  const pathProfil = isWidthTrue ? '/profil' : '/profil/mes-recettes';
  const welcomePageShowed = JSON.parse(localStorage.getItem('welcomePageShowed'));
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const movingUpSearchbar = () => {
    const form = document.querySelector('.Header-form');
    const containerHeader = document.querySelector('.container-header');
    const header = document.querySelector('.Header');
    const buttonSearch = document.querySelector('.Header-form-button');
    const buttonToggle = document.querySelector('.Header-show-button');

    if (showTopBtn === true && screenWidth === true) {
      header.append(buttonToggle);
      header.append(form);
      buttonToggle.classList.remove('none');
      form.classList.add('none');
      header.classList.add('Small');
      form.classList.add('Small-searchbar');
      buttonSearch.classList.add('small-button');
    } else {
      header.classList.remove('Small');
      buttonToggle.classList.add('none');
      form.classList.remove('none');
      form.classList.remove('Small-searchbar');
      buttonSearch.classList.remove('small-button');
      containerHeader.append(form);
    }
  };

  const handleNavProfil = () => {
    if (isWidthTrue === false) {
      dispatch(setActivPage('/profil/mes-recettes'));
    }
  };

  const handleScrollSearchbar = () => {
    if (window.scrollY > 200) {
      setShowTopBtn(true);
    } else {
      setShowTopBtn(false);
    }
    movingUpSearchbar();
  };

  const handleWidthDimension = () => {
    if (window.innerWidth < 575) {
      setScreenWidth(true);
    } else {
      setScreenWidth(false);
    }
    movingUpSearchbar();
  };

  useLayoutEffect(() => {
    handleWidthDimension();
    handleScrollSearchbar();
  }, []);

  const handleSubmitForm = (evt) => {
    evt.preventDefault();
    const path = location.pathname;
    if (path !== '/recettes') {
      navigate('/recettes');
    }
    const lowerCaseSearchValue = searchBarValue
      .toLocaleLowerCase()
      .replace(/([-'`~!@#$§%^&*(){}_|+=?;:'",.<>\\[\]\\/0-9])/gi, '');
    if (lowerCaseSearchValue) {
      dispatch(setSearchValue(lowerCaseSearchValue));
    }
    if (showTopBtn === true && screenWidth === true) {
      const buttonToggle = document.querySelector('.Header-show-button');
      const form = document.querySelector('.Header-form');
      buttonToggle.classList.remove('none');
      form.classList.add('none');
    }
    setscrollbarOn(!scrollbarOn);
  };

  const toggleSearchBar = () => {
    setscrollbarOn((prevScrollbarOn) => !prevScrollbarOn);
    const buttonToggle = document.querySelector('.Header-show-button');
    const form = document.querySelector('.Header-form');

    if (!scrollbarOn) {
      buttonToggle.classList.add('none');
      form.classList.remove('none');
    }
  };

  const toggleCloseButton = () => {
    if (searchBarValue) {
      setClosingButton(true);
    } else {
      setClosingButton(false);
    }
  };

  window.addEventListener('scroll', handleScrollSearchbar);
  window.addEventListener('resize', handleWidthDimension);

  return (
    <div className="container-header">
      <Navbar collapseOnSelect variant="light" expand="lg" className="Header">
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="Header-burger"
        />
        <Navbar.Brand className="Header-logoMain">
          <Link to={welcomePageShowed ? '/' : '/welcome'}>
            <img
              src={logoMain}
              alt="logo du site qui est un panier de fruit et légumes"
            />
          </Link>
        </Navbar.Brand>
        <Nav className="Header-utilsLink">
          <p>
            Bienvenue
            {' '}
            {nickname}
          </p>
          <Nav>
            <Link
              to={isInvited ? '/welcome' : pathProfil}
              onClick={() => {
                dispatch(setCurrentButtonId(1));
                dispatch(setLink('recipes/my'));
                handleNavProfil();
              }}
              className="nav-link"
            >
              <img
                className="Header-utilsLink-logo"
                src={isInvited ? logoConnexion : logoUser}
                alt="logo d'un utilisateur'"
                title="Mon profil"
              />
            </Link>
          </Nav>
          <Nav>
            {isInvited === false && (
              <>
                <Link
                  to="/profil"
                  className="nav-link"
                  onClick={() => {
                    dispatch(setCurrentButtonId(5));
                    dispatch(setActivPage('/profil/mes-courses'));
                  }}
                >
                  <img
                    style={{ marginLeft: '15px' }}
                    className="Header-utilsLink-logo"
                    src={logoCart}
                    alt="logo d'un utilisateur'"
                    title="Ma liste de courses"
                  />
                </Link>
                <Link
                  to="/welcome"
                  onClick={() => {
                    dispatch(setTokenUser(null));
                    dispatch(setConnectedUser(false));
                    dispatch(setInvitedUser(true));
                    dispatch(clearRecipes());
                    localStorage.removeItem('isLoggedIn');
                    localStorage.removeItem('token');
                    localStorage.removeItem('refreshToken');
                    localStorage.removeItem('invitedUser');
                    localStorage.removeItem('welcomePageShowed');
                  }}
                  className="nav-link"
                >
                  <img
                    className="Header-utilsLink-logo"
                    src={logoDeconnexion}
                    alt="logo d'un utilisateur"
                    title="Déconnexion"
                  />
                </Link>
              </>
            )}
          </Nav>
        </Nav>
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="Header-link"
          // exemple: className={`Header-link ${showTopBtn ? 'btn-show' : ''}`}
        >
          <Nav className="mr-auto ">
            <Nav>
              <Link to="/recettes" className="nav-link">
                Recettes
              </Link>
            </Nav>
            <Nav>
              {isInvited === false && (
                <Link
                  to="/profil/mes-repas"
                  onClick={() => {
                    dispatch(setCurrentButtonId(4));
                    dispatch(setActivPage('/profil/mes-repas'));
                  }}
                  className="nav-link"
                >
                  Ma liste de repas
                </Link>
              )}
            </Nav>
            <Nav>
              {isInvited === false && (
                <Link
                  to="/profil/mes-ingredients"
                  className="nav-link"
                  onClick={() => {
                    dispatch(setCurrentButtonId(3));
                    dispatch(setActivPage('/profil/mes-ingredients'));
                  }}
                >
                  Mon frigo
                </Link>
              )}
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <form className="Header-form" onSubmit={handleSubmitForm}>
        {/* exemple : {(showTopBtn && screenWidth) && <button type="button">Coucou</button>} */}
        <input
          className="Header-form-input"
          value={searchBarValue}
          onChange={(evt) => {
            setSearchBarValue(evt.target.value);
            toggleCloseButton();
          }}
        />
        {closingButton && (
          <button
            type="button"
            aria-label="clear search bar"
            className="Header-form-button-close"
            onClick={() => {
              setSearchBarValue('');
              dispatch(setSearchValue(''));
              setClosingButton(!closingButton);
            }}
          />
        )}
        <button
          type="submit"
          aria-label="search bar"
          className="Header-form-button"
        />
      </form>
      <button
        className="Header-show-button none"
        aria-label="show form"
        type="button"
        onClick={toggleSearchBar}
      />
    </div>
  );
}

export default Header;
