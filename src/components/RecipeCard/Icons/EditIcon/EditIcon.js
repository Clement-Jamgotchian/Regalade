// Styles import
import './EditIcon.scss';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { setRecipeToEdit } from '../../../../actions/recipe';
import AxiosPrivate from '../../../../utils/AxiosPrivate';

// If recipe is in the list or favorite page, we show the Edit icon instead of the favorite icon
function EditIcon({ recipe }) {
  const navigate = useNavigate();
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
  const location = useLocation();
  const isInPageList = location.pathname === '/profil/mes-favorites' || location.pathname === '/profil/mes-recettes' || location.pathname === '/recettes' || location.pathname === '/' || location.pathname === `/recette/${recipe.id}`;
  const dispatch = useDispatch();

  const getRecipe = async () => {
    await AxiosPrivate.get(`/recipes/${recipe.id}`)
      .then((res) => {
        dispatch(setRecipeToEdit(res.data));
        navigate('/recette/modification');
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (isLoggedIn && isInPageList) {
    return (
      <Button className="EditIcon" type="button" onClick={() => { getRecipe(); }} />
    );
  }
}

EditIcon.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    picture: PropTypes.string,
    title: PropTypes.string.isRequired,
    rating: PropTypes.number,
    cookingDuration: PropTypes.number.isRequired,
    setupDuration: PropTypes.number.isRequired,
    difficulty: PropTypes.number.isRequired,
    portions: PropTypes.number,
    userPortions: PropTypes.number,
  }).isRequired,
};

export default EditIcon;
