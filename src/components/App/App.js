import { Col, Container, Row } from 'react-bootstrap';
import './App.scss';
import Header from '../Header/Header';

function App() {
  return (
    <Container>
      <Header />
      <Row>
        <Col>
          <p>Lu</p>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
