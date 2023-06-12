import './Header.scss';
import { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, Navbar } from 'react-bootstrap';

import logoMain from '../../assets/images/logoMain.png';
import logoUser from '../../assets/images/logoUser.png';
import logoCart from '../../assets/images/logoCart.png';
import { setSearchValue } from '../../actions/header';

function Header() {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [screenWidth, setScreenWidth] = useState(false);
  const [scrollbarOn, setscrollbarOn] = useState(false);
  const [searchBarValue, setSearchBarValue] = useState('');
  const nickname = useSelector((state) => state.user.nickname);
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

  const toggleSearchBar = () => {
    setscrollbarOn((prevScrollbarOn) => !prevScrollbarOn);
    const buttonToggle = document.querySelector('.Header-show-button');
    const form = document.querySelector('.Header-form');

    if (!scrollbarOn) {
      buttonToggle.classList.add('none');
      form.classList.remove('none');
    }
  };

  const handleSubmitForm = (evt) => {
    evt.preventDefault();
    const lowerCaseSearchValue = searchBarValue
      .toLocaleLowerCase()
      .replace(/([^a-zA-Z0-9 ]|[0-9])/g, '');
    dispatch(setSearchValue(lowerCaseSearchValue));
    if (showTopBtn === true && screenWidth === true) {
      const buttonToggle = document.querySelector('.Header-show-button');
      const form = document.querySelector('.Header-form');
      buttonToggle.classList.remove('none');
      form.classList.add('none');
    }
    setSearchBarValue('');
    setscrollbarOn(!scrollbarOn);
  };

  window.addEventListener('scroll', handleScrollSearchbar);
  window.addEventListener('resize', handleWidthDimension);

  return (
    <div className="container-header">
      <Navbar collapseOnSelect bg="info" variant="light" expand="lg" className="Header">
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="Header-burger"
        />
        <Navbar.Brand href="/home" className="Header-logoMain">
          <img
            src={logoMain}
            alt="logo du site qui est un panier de fruit et légumes"
          />
        </Navbar.Brand>
        <Nav className="Header-utilsLink">
          <p>
            Bienvenue
            {nickname}
          </p>
          <Nav.Link href="/profil">
            <img
              className="Header-utilsLink-logo"
              src={logoUser}
              alt="logo d'un utilisateur'"
            />
          </Nav.Link>
          <Nav.Link href="/list">
            <img
              style={{ marginLeft: '15px' }}
              className="Header-utilsLink-logo"
              src={logoCart}
              alt="logo d'un utilisateur'"
            />
          </Nav.Link>
        </Nav>
        <Navbar.Collapse id="responsive-navbar-nav  " className="Header-link">
          <Nav className="mr-auto ">
            <Nav.Link href="/recipes">Recettes</Nav.Link>
            <Nav.Link href="/list">Liste de repas</Nav.Link>
            <Nav.Link href="/fridge">Mon frigo</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <form className="Header-form" onSubmit={handleSubmitForm}>
        <input
          className="Header-form-input"
          value={searchBarValue}
          onChange={(evt) => {
            setSearchBarValue(evt.target.value);
          }}
        />
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
