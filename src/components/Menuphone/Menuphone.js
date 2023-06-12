import caddie from '../../assets/images/caddie.png';
import toque from '../../assets/images/toque.png';
import plat from '../../assets/images/plat.png';
import user from '../../assets/images/utilisateur.png';

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
