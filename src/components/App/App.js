import { Col, Container, Row } from 'react-bootstrap';
import './App.scss';
import Header from '../Header/Header';
import Recipes from '../Recipes/Recipes';
import Footer from '../Footer/Footer';
import HomepageInscription from '../HomepageInscription/HomepageInscription';

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
      <Footer />
    </Container>
  );
}

export default App;
