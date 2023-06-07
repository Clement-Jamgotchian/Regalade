import { Col, Container, Row } from 'react-bootstrap';
import './App.scss';
import Header from '../Header/Header';
import Bloc from '../Bloc/Bloc';

function App() {
  return (
    <Container fluid className="App">
      <Header />
      <Bloc />
      <Bloc />
      <Bloc />

      <Bloc />

      <Bloc />

      <Row>
        <Col>
          <p>Lu</p>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
