import './Header.scss';

import logoMain from '../../assets/images/logoMain.png';
import logoUser from '../../assets/images/logoUser.png';
import logoCart from '../../assets/images/logoCart.png';

function Header() {
  return (
    <div className="Header">
      <div className="Header-nav">
        <div className="Header-link">
          <a href="/home">Recettes</a>
          <a href="/home">Liste de repas</a>
          <a href="/home">Mon frigo</a>
        </div>

        <a href="/home" className="Header-logoMain">
          <img src={logoMain} alt="panier contenant des fruits et légumes" />
        </a>
        <div className="Header-utilsLink">
          <p>Bonjour Clem</p>
          <a href="/profil">
            <img
              src={logoUser}
              alt="logo d'un utilisateur"
              className="Header-utilsLink-logo"
              style={{ height: '37px' }}
            />
          </a>
          <a href="/cart">
            <img
              src={logoCart}
              alt="caddie de course"
              className="Header-utilsLink-logo"
            />
          </a>
        </div>
      </div>

      <form className="Header-form">
        <input
          className="Header-form-input"
          placeholder="Votre recherche"
          id="search"
          name="search"
          required
        />
        <button
          type="submit"
          aria-label="search bar"
          className="Header-form-button"
        />
      </form>
    </div>
  );
}

export default Header;
