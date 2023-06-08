import { Col, Container, Row } from 'react-bootstrap';
import './App.scss';
import Recipes from '../Recipes/Recipes';

function App() {
  return (
    <Container>
      <Row>
        <Col>
          <Recipes />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
