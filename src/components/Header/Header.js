import './Header.scss';
import { useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';

import logoMain from '../../assets/images/logoMain.png';
import logoUser from '../../assets/images/logoUser.png';
import logoCart from '../../assets/images/logoCart.png';

function Header() {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [screenWidth, setScreenWidth] = useState(false);

  const movingUpSearchbar = () => {
    const searchbar = document.querySelector('.Header-form');
    const containerHeader = document.querySelector('.container-header');
    const header = document.querySelector('.Header');
    const input = document.querySelector('input');
    const buttonSearch = document.querySelector('.Header-form-button');

    if (showTopBtn === true && screenWidth === true) {
      header.append(searchbar);
      searchbar.classList.add('small-searchbar');
      input.classList.add('none');
      buttonSearch.classList.add('small-button');
    } else {
      searchbar.classList.remove('small-searchbar');
      buttonSearch.classList.remove('small-button');
      input.classList.remove('none');
      containerHeader.append(searchbar);
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
    if (window.innerWidth < 600) {
      setScreenWidth(true);
    } else {
      setScreenWidth(false);
    }
    movingUpSearchbar();
  };

  window.addEventListener('scroll', handleScrollSearchbar);
  window.addEventListener('resize', handleWidthDimension);

  return (
    <div className="container-header">
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="info"
        variant="primary"
        className="Header"
      >
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="Header-burger"
        />
        <Navbar.Brand href="#home" className="Header-logoMain">
          <img
            src={logoMain}
            alt="logo du site qui est un panier de fruit et légumes"
          />
        </Navbar.Brand>
        <Nav className="Header-utilsLink">
          <p>Bienvenue Clem</p>
          <Nav.Link href="#deets">
            <img
              className="Header-utilsLink-logo"
              src={logoUser}
              alt="logo d'un utilisateur'"
            />
          </Nav.Link>
          <Nav.Link href="#memes">
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
            <Nav.Link href="#features">Recettes</Nav.Link>
            <Nav.Link href="#pricing">Liste de repas</Nav.Link>
            <Nav.Link href="#pricing">Mon frigo</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <form className="Header-form">
        <input className="Header-form-input" />
        <button
          type="submit"
          aria-label="search bar"
          className="Header-form-button"
          onClick={() => {
            // submitInputSearch();
            toggleSearchbar();
          }}
        />
      </form>
    </div>
  );
}

export default Header;
