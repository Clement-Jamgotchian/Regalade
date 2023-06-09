import caddie from '../../assets/images/caddie.png';
import toque from '../../assets/images/toque.png';
import plat from '../../assets/images/plat.png';
import user from '../../assets/images/utilisateur.png';

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
