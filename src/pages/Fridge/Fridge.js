import './Fridge.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import fridgeLogo from '../../assets/images/frigo.png';
import closetLogo from '../../assets/images/placard.png';

function Fridge() {
  return (
    <Container className="Fridge">
      <Row className="Fridge-container">
        <Col className="Fridge-closet">
          <h3 className="Fridge-Title">
            Dans le frigo
            <img
              src={fridgeLogo}
              alt="Logo d'un frigo de couleur orange"
              className="Fridge-img"
            />
          </h3>
        </Col>
        <Col className="Fridge-closet">
          <h3 className="Fridge-Title">
            Dans les placards
            <img
              src={closetLogo}
              alt="Logo d'un frigo de couleur orange"
              className="Fridge-img"
            />
          </h3>
        </Col>
      </Row>
    </Container>
  );
}

export default Fridge;
