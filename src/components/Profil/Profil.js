import './Profil.scss';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from 'react-bootstrap';
import axios from 'axios';
import Recipes from '../Recipes/Recipes';
import Loader from '../Loader/Loader';
import toque from '../../assets/images/toque.png';
import caddie from '../../assets/images/caddie.png';
import utilisateur from '../../assets/images/utilisateur.png';
import frigo from '../../assets/images/frigo.png';
import coeur from '../../assets/images/coeur.png';
import list from '../../assets/images/liste.png';
import { MyLayout } from '../MyLayout';
import {
  setWidthValue,
  setCurrentButtonId,
  setLink,
  setActivPage,
} from '../../actions/profil';
import List from '../../pages/List/List';
import Fridge from '../../pages/Fridge/Fridge';
import Cart from '../../pages/Cart/Cart';

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
  const activePage = useSelector((state) => state.profil.activProfilPage);
  const [screenWidth, setScreenWidth] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [recipes, setRecipes] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const currentButtonId = useSelector((state) => state.profil.profilButtonId);
  const linkAPI = useSelector((state) => state.profil.link);
  const dispatch = useDispatch();
  const pageNumber = useSelector((state) => state.list.pageNumber);
  const pageRequest = pageNumber > 0 ? `page=${pageNumber}` : '';
  const baseUrl = `https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/${linkAPI}`;
  const request = `?${pageRequest}`;
  console.log(linkAPI);

  const getRecipes = async () => {
    axios
      .get(baseUrl + request)
      .then((response) => {
        setRecipes(response.data.recipes);
        setPageCount(response.data.totalPages);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getRecipes();
  }, [isOpen]);

  const handleWidthDimension = () => {
    if (window.innerWidth > 990) {
      setScreenWidth(true);
    } else {
      setScreenWidth(false);
    }
  };

  const getCurrentId = (id) => {
    dispatch(setCurrentButtonId(id));
  };

  const togglePages = (link) => {
    dispatch(setActivPage(link));
    setIsOpen(!isOpen);
    dispatch(setWidthValue(!screenWidth));
    if (link === '/profil/mes-recettes') {
      dispatch(setLink('recipes/my'));
    }
    if (link === '/profil/mes-favorites') {
      dispatch(setLink('favorite'));
    }
  };

  useLayoutEffect(() => {
    handleWidthDimension();
  }, []);

  const renderContent = () => {
    if (activePage === '/profil/mes-recettes') {
      return (
        <>
          <Recipes recipes={recipes} />
          <Pagination setRecipes={setRecipes} pageCount={pageCount} />
        </>
      );
    }
    if (activePage === '/profil/mes-favorites') {
      return <Recipes recipes={recipes} />;
    }
    if (activePage === '/profil/mes-ingredients') {
      return <Fridge />;
    }
    if (activePage === '/profil/mes-repas') {
      return <List />;
    }
    if (activePage === '/profil/mes-courses') {
      return <Cart />;
    }
    if (activePage === '/profil/mes-infos') {
      return <Loader />;
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
