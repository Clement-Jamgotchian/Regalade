/* eslint-disable no-plusplus */
// React components
import { /* useEffect, */useState } from 'react';
// import axios from 'axios';
import {
  Col, Container, Row,
} from 'react-bootstrap';

// Local components
import RecipeCard from '../RecipeCard/RecipeCard';
import recipesData from '../../data/recipes';

// Styles import
import './Recipes.scss';

function Recipes() {
  const [recipes/* , setRecipes */] = useState(recipesData);

  //   useEffect(() => {
  //     axios.get('https://regalade.lesliecordier.fr/public/api/recipes', { mode: 'cors' })
  //       .then((response) => {
  //         setRecipes(response.data);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }, []);
  if (recipes.length === 0) {
    // return <Loading />;
  }

  return (
    <Container>
      <Row>
        {recipes && (
        <div className="Recipes--content">
          {recipes.map((recipe) => (
            <Col xs={12} md={4} lg={3}>
              <RecipeCard key={recipe.id} recipe={recipe} />
            </Col>
          ))}
        </div>
        )}
      </Row>
    </Container>
  );
}

export default Recipes;
