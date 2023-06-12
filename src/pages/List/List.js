// React components
import { useSelector } from 'react-redux';

// Local components
import Recipes from '../../components/Recipes/Recipes';

// Styles import
import './List.scss';

function List() {
  const recipes = useSelector((state) => state.list.recipes);

  if (recipes.length === 0) {
    <p>Ajoutez votre première recette à votre liste de repas</p>;
  }

  return (
    <div className="List">

      {recipes && (
        <Recipes recipes={recipes} />
      )}
    </div>
  );
}

export default List;
