import './Footer.scss';
import Nav from 'react-bootstrap/Nav';

function Footer() {
  return (
    <>
      <Nav className="justify-content-center Footer" activeKey="/home">
        <Nav.Item>
          <Nav.Link href="/home">Mentions légales</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1">Confidentialités</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">FAQ</Nav.Link>
        </Nav.Item>
      </Nav>
      <p className="text-center mt-2 mb-4">&copy;  Régalade</p>
    </>
  );
}

export default Footer;
