import { Col, Container, Row } from 'react-bootstrap';
import './App.scss';
import Recipes from '../Recipes/Recipes';
import HomepageInscription from '../HomepageInscription/HomepageInscription';

function App() {
  return (
    <Container>
      <Row>
        <Col>
          <Recipes />
        </Col>
      </Row>
      <HomepageInscription />
    </Container>
  );
}

export default App;
