// React components
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Local components
import Recipes from '../../components/Recipes/Recipes';

// Styles import
import './List.scss';

function List() {
  const [list, setList] = useState([]);
  const recipes = useSelector((state) => state.list.recipes);

  const getList = async () => {
    await axios.post('https://regalade.lesliecordier.fr/projet-o-lala-la-regalade-back/public/api/list/')
      .then((res) => {
        console.log(res.data);
        setList(res.data);
      })
      .catch((error) => {
        console.log(error);
        setList(recipes);
      });
  };

  useEffect(() => {
    getList();
  });

  if (recipes.length === 0) {
    <Link to="/recipes">Ajoutez votre première recette à votre liste de repas</Link>;
  }

  return (
    <div className="List">

      {recipes && (
        <Recipes recipes={list} />
      )}
    </div>
  );
}

export default List;
