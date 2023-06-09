import { Col, Container, Row } from 'react-bootstrap';
import './App.scss';
import Header from '../Header/Header';
import Recipes from '../Recipes/Recipes';
import HomepageInscription from '../HomepageInscription/HomepageInscription';
import Loader from '../Loader/Loader';

function App() {
  return (
    <Container fluid className="App">
      <Header />
      <Row>
        <Col>
          <Recipes />
        </Col>
      </Row>
      <HomepageInscription />
      <Loader />
    </Container>
  );
}

export default App;
