import { Col, Container, Row } from 'react-bootstrap';
import './App.scss';
import RecipeCard from '../RecipeCard/RecipeCard';

function App() {
  return (
    <Container>
      <Row>
        <Col>
          <RecipeCard
            favorite="true"
            picture="https://picsum.photos/200"
            title="Tartiflette"
            rating="1.2"
            time="30 min"
            difficulty="Facile"
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
