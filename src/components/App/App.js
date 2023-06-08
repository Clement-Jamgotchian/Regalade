import { Col, Container, Row } from 'react-bootstrap';
import './App.scss';
import RecipeCard from '../RecipeCard/RecipeCard';

function App() {
  return (
    <Container>
      <Row>
        <Col>
          <RecipeCard />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
