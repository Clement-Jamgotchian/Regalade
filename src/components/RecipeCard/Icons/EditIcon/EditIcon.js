// Styles import
import './EditIcon.scss';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from 'react-bootstrap';

// If recipe is in the list or favorite page, we show the Edit icon instead of the favorite icon
function EditIcon() {
  const navigate = useNavigate();
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
  const location = useLocation();
  const isInPageList = location.pathname === '/profil/mes-favorites' || location.pathname === '/profil/mes-recettes' || location.pathname === '/recettes';
  if (isLoggedIn && isInPageList) {
    return (
      <Button className="EditIcon" type="button" onClick={() => { navigate('/recette/creation'); }} />
    );
  }
}

export default EditIcon;
