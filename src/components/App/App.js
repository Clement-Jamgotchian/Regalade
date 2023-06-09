import { Container } from 'react-bootstrap';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from '../Header/Header';
import Recipes from '../Recipes/Recipes';

import HomepageInscription from '../HomepageInscription/HomepageInscription';
import Loader from '../Loader/Loader';
import Faq from '../Faq/Faq';


import Footer from '../Footer/Footer';
import Menuphone from '../Menuphone/Menuphone';
// import HomepageInscription from '../HomepageInscription/HomepageInscription';
// import Loader from '../Loader/Loader';




function App() {
  const isLoading = useSelector((state) => state.user.isLoading);
  return (
    <Container fluid className="App">
      <Header />

      <Routes>
        <Route path="/" element={<HomepageInscription />} />
        <Route
          path="/home"
          element={
            <Recipes />
            }
        />
        <Route path="/faq" element={<Faq />} />
      </Routes>
      {isLoading && <Loader />}

      {/* <Loader /> */}
      {/* <HomepageInscription /> */}
      <Menuphone />
      <Footer />

    </Container>
  );
}

export default App;
