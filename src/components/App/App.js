import { Col, Container, Row } from 'react-bootstrap';
import './App.scss';
import HomepageInscription from '../HomepageInscription/HomepageInscription';

import RecipeCard from '../RecipeCard/RecipeCard';

function App() {
  return (
    <Container>
      <Row>
        <Col>
          <RecipeCard />
        </Col>
      </Row>
      <HomepageInscription />
    </Container>
  );
}

export default App;
