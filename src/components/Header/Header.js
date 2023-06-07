import './Header.scss';
import { Nav, Navbar } from 'react-bootstrap';

import logoMain from '../../assets/images/logoMain.png';
import logoUser from '../../assets/images/logoUser.png';
import logoCart from '../../assets/images/logoCart.png';

function Header() {
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
          // bg="primary"
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
          type="button"
          aria-label="search bar"
          className="Header-form-button"
        />
      </form>
    </div>
  );
}

export default Header;
