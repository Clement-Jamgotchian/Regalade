import './Profil.scss';
import { useLayoutEffect, useState } from 'react';
import { Route, Routes, NavLink } from 'react-router-dom';
import Recipes from '../Recipes/Recipes';
import Loader from '../Loader/Loader';
import toque from '../../assets/images/toque.png';
import caddie from '../../assets/images/caddie.png';
import utilisateur from '../../assets/images/utilisateur.png';
import frigo from '../../assets/images/frigo.png';
import coeur from '../../assets/images/coeur.png';
import list from '../../assets/images/liste.png';

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
  const [currentButtonId, setCurrentButtonId] = useState(null);
  const [screenWidth, setScreenWidth] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const getCurrentId = (id) => {
    setCurrentButtonId(id);
  };

  const handleWidthDimension = () => {
    if (window.innerWidth > 990) {
      setScreenWidth(true);
    } else {
      setScreenWidth(false);
    }
  };

  const togglePages = () => {
    setIsOpen(!isOpen);
    setScreenWidth(!screenWidth);
  };

  useLayoutEffect(() => {
    handleWidthDimension();
  }, []);

  window.addEventListener('resize', handleWidthDimension);

  return (
    <div className="container-profil">
      {isOpen && (
        <div className="Profil">
          {profilDataNav.map((profil) => (
            <NavLink
              to={profil.link}
              key={profil.id}
              className={`Profil-card ${
                profil.id === currentButtonId ? 'activLink' : ''
              }`}
              onClick={() => {
                getCurrentId(profil.id);
                togglePages();
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
            </NavLink>
          ))}
        </div>
      )}

      {screenWidth && (
        <div className="Profil-content">
          <button
            type="button"
            alt="Go to profil"
            className="Profil-content-button"
          />
          <Routes>
            <Route path="/profil/mes-recettes" element={<Recipes />} />
            <Route path="/profil/mes-favorites" element={<Recipes />} />
            <Route path="/profil/mes-ingredients" element={<Loader />} />
            <Route path="/profil/mes-repas" element={<Loader />} />
            <Route path="/profil/mes-courses" element={<Loader />} />
            <Route path="/profil/mes-infos" element={<Loader />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default Profil;
