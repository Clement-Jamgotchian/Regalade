import Header from './Header/Header';
import Footer from './Footer/Footer';
import Menuphone from './Menuphone/Menuphone';
import './MyLayout.scss';

// eslint-disable-next-line import/prefer-default-export, react/prop-types
export function MyLayout({ children }) {
  return (
    <div className="MyLayout">
      <Header />
      {children}
      <Menuphone />
      <Footer />
    </div>
  );
}
