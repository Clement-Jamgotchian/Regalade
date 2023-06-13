import caddie from '../../assets/images/caddieWhite.png';
import toque from '../../assets/images/toqueWhite.png';
import plat from '../../assets/images/platWhite.png';
import user from '../../assets/images/utilisateurWhite.png';

import './Menuphone.scss';

function Menuphone() {
  return (
    <div className="Menuphone">
      <a href="/profil">
        <img alt="logo d'une toque" src={toque} />
      </a>
      <a href="/profil">
        <img alt="logo d'un plat" src={plat} />
      </a>
      <a href="/profil">
        <img alt="icone d'un caddie" src={caddie} />
      </a>
      <a href="/profil">
        <img alt="logo du profil utilisateur" src={user} />
      </a>
    </div>
  );
}

export default Menuphone;
