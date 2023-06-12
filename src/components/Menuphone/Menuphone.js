import caddie from '../../assets/images/caddieWhite.png';
import toque from '../../assets/images/toqueWhite.png';
import plat from '../../assets/images/platWhite.png';
import user from '../../assets/images/utilisateurWhite.png';

import './Menuphone.scss';

function Menuphone() {
  return (
    <div className="Menuphone">
      <a href="/profil">
        <img alt="logo du profil utilisateur" src={toque} />
      </a>
      <a href="/profil">
        <img alt="logo du profil utilisateur" src={plat} />
      </a>
      <a href="/profil">
        <img alt="logo du profil utilisateur" src={caddie} />
      </a>
      <a href="/profil">
        <img alt="logo du profil utilisateur" src={user} />
      </a>
    </div>
  );
}

export default Menuphone;
