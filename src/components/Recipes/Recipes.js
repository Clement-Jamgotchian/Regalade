import { Col, Container, Row } from 'react-bootstrap';
import './Recipes.scss';
import RecipeCard from '../RecipeCard/RecipeCard';

function Recipes() {
  return (
    <Container>
      <Row>
        <Col>
          <RecipeCard />
        </Col>
        <Col>
          <RecipeCard />
        </Col>
        <Col>
          <RecipeCard />
        </Col>
        <Col>
          <RecipeCard />
        </Col>
      </Row>
      <Row>
        <Col>
          <RecipeCard />
        </Col>
        <Col>
          <RecipeCard />
        </Col>
        <Col>
          <RecipeCard />
        </Col>
        <Col>
          <RecipeCard />
        </Col>
      </Row>
    </Container>
  );
}

export default Recipes;
