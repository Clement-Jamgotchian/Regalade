import './Footer.scss';
import Nav from 'react-bootstrap/Nav';

function Footer() {
  return (
    <div className="Footer">
      <Nav fluid className="justify-content-center" activeKey="/home" bg="info">
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
      <p className="text-center mt-2">&copy; Régalade</p>
    </div>
  );
}

export default Footer;
