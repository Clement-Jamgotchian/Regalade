import { Link } from 'react-router-dom';
import './Footer.scss';
import Nav from 'react-bootstrap/Nav';

function Footer() {
  return (
    <div className="Footer">
      <Nav className="justify-content-center" activeKey="/home" bg="info">
        <Nav.Item>
          <Nav.Link eventkey="link-1">Mentions légales</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventkey="link-1">Confidentialités</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav eventkey="link-2">
            <Link to="/FAQ" className="nav-link">
              FAQ
            </Link>
          </Nav>
        </Nav.Item>
      </Nav>
      <p className="text-center mt-2">&copy; Régalade</p>
    </div>
  );
}

export default Footer;