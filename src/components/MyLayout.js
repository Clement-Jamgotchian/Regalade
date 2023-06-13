import Footer from './Footer/Footer';
import Header from './Header/Header';
import Menuphone from './Menuphone/Menuphone';

// eslint-disable-next-line import/prefer-default-export, react/prop-types
export function MyLayout({ children }) {
  return (
    <>
      <Header />
      <Menuphone />
      {children}
      <Footer />
    </>
  );
}
