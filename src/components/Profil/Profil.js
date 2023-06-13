import './Profil.scss';
import { useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Recipes from '../Recipes/Recipes';
import Loader from '../Loader/Loader';
import toque from '../../assets/images/toque.png';
import caddie from '../../assets/images/caddie.png';
import utilisateur from '../../assets/images/utilisateur.png';
import frigo from '../../assets/images/frigo.png';
import coeur from '../../assets/images/coeur.png';
import list from '../../assets/images/liste.png';
import { MyLayout } from '../MyLayout';
import { setWidthValue } from '../../actions/profil';
import List from '../../pages/List/List';

const profilDataNav = [
  {
    id: 1,
    title: 'recettes',
    picture: toque,
    link: '/profil/mes-recettes',
  },
  {
    id: 2,
    title: 'favorites',
    picture: coeur,
    link: '/profil/mes-favorites',
  },
  {
    id: 3,
    title: 'frigo',
    picture: frigo,
    link: '/profil/mes-ingredients',
  },
  {
    id: 4,
    title: 'repas',
    picture: list,
    link: '/profil/mes-repas',
  },
  {
    id: 5,
    title: 'courses',
    picture: caddie,
    link: '/profil/mes-courses',
  },
  {
    id: 6,
    title: 'infos',
    picture: utilisateur,
    link: '/profil/mes-infos',
  },
];

function Profil() {
  const [screenWidth, setScreenWidth] = useState(false);
  const [currentButtonId, setCurrentButtonId] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [activePage, setActivePage] = useState('/profil/mes-recettes');
  const dispatch = useDispatch();

  const handleWidthDimension = () => {
    if (window.innerWidth > 990) {
      setScreenWidth(true);
    } else {
      setScreenWidth(false);
    }
  };

  const getCurrentId = (id) => {
    setCurrentButtonId(id);
  };

  const togglePages = (link) => {
    setActivePage(link);
    setIsOpen(!isOpen);
    dispatch(setWidthValue(!screenWidth));
  };

  useLayoutEffect(() => {
    handleWidthDimension();
  }, []);

  const renderContent = () => {
    if (activePage === '/profil/mes-recettes') {
      return <Loader />;
    }
    if (activePage === '/profil/mes-favorites') {
      return <Loader />;
    }
    if (activePage === '/profil/mes-ingredients') {
      return <Recipes />;
    }
    if (activePage === '/profil/mes-repas') {
      return <List />;
    }
    if (activePage === '/profil/mes-courses') {
      return <Recipes />;
    }
    if (activePage === '/profil/mes-infos') {
      return <Recipes />;
    }

    return null;
  };

  window.addEventListener('resize', handleWidthDimension);

  return (
    <MyLayout>
      <div className="container-profil">
        <div className="Profil">
          {profilDataNav.map((profil) => (
            <Link
              to={profil.link}
              key={profil.id}
              className={`Profil-card ${
                profil.id === currentButtonId ? 'activLink' : ''
              }`}
              onClick={() => {
                getCurrentId(profil.id);
                togglePages(profil.link);
              }}
            >
              <h4 className="Profil-card-title">
                {profil.title === 'frigo' ? 'Mon' : 'Mes'}
                <img
                  src={profil.picture}
                  alt="tets"
                  className="Profil-card-img"
                />
                {profil.title}
              </h4>
            </Link>
          ))}
        </div>
        {screenWidth && (
          <div className="Profil-content">
            <div>{renderContent()}</div>
          </div>
        )}
      </div>
    </MyLayout>
  );
}

export default Profil;
