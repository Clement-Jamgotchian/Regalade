import { Col, Container, Row } from 'react-bootstrap';
import './App.scss';
import Header from '../Header/Header';
// import Recipes from '../Recipes/Recipes';
import Footer from '../Footer/Footer';
import Menuphone from '../Menuphone/Menuphone';
import Profil from '../Profil/Profil';
// import HomepageInscription from '../HomepageInscription/HomepageInscription';
// import Loader from '../Loader/Loader';

function App() {
  return (
    <Container fluid className="App">
      <Header />
      {/* <Loader /> */}
      <Row>
        <Col>{/* <Recipes /> */}</Col>
      </Row>
      {/* <HomepageInscription /> */}
      <Profil />
      <Menuphone />
      <Footer />
    </Container>
  );
}

export default App;
