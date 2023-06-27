import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import caddie from '../../assets/images/caddieWhite.png';
import toque from '../../assets/images/toqueWhite.png';
import plat from '../../assets/images/platWhite.png';
import user from '../../assets/images/utilisateurWhite.png';
import connexion from '../../assets/images/connexionWhite.png';

import './Menuphone.scss';

function Menuphone() {
  const isInvited = useSelector((state) => state.user.isInvitedIn);
  return (
    <div className="Menuphone" style={{ width: isInvited ? '40%' : '' }}>
      <Link to="/recettes">
        <img alt="logo d'une toque" src={toque} />
      </Link>
      {isInvited === false && (
        <Link to="/profil/mes-recettes">
          <img alt="logo d'un plat" src={plat} />
        </Link>
      )}
      {isInvited === false && (
        <Link to="/profil/mes-courses">
          <img alt="icone d'un caddie" src={caddie} />
        </Link>
      )}
      <Link to={isInvited ? '/welcome' : '/profil'}>
        <img
          alt="logo du profil utilisateur"
          src={isInvited ? connexion : user}
        />
      </Link>
    </div>
  );
}

export default Menuphone;
