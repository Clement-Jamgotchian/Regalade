import Header from './Header/Header';
import Footer from './Footer/Footer';
import Menuphone from './Menuphone/Menuphone';

// eslint-disable-next-line import/prefer-default-export, react/prop-types
export function MyLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Menuphone />
      <Footer />
    </>
  );
}
