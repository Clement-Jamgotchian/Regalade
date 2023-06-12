import { Container } from 'react-bootstrap';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from '../Header/Header';
import HomepageInscription from '../HomepageInscription/HomepageInscription';
import Loader from '../Loader/Loader';
import Faq from '../Faq/Faq';
import Footer from '../Footer/Footer';
import Menuphone from '../Menuphone/Menuphone';
import Homepage from '../../pages/Homepage/Homepage';
import RecipesList from '../../pages/List/List';

function App() {
  const isLoading = useSelector((state) => state.user.isLoading);
  return (
    <>
      <Container className="App">
        <Header />

        <Routes>
          <Route path="/" element={<HomepageInscription />} />
          <Route
            path="/home"
            element={
              <Homepage />
            }
          />
          <Route
            path="/list"
            element={
              <RecipesList />
            }
          />
          <Route path="/faq" element={<Faq />} />
        </Routes>

        {isLoading && <Loader />}

        <Menuphone />

      </Container>
      <Footer />
    </>
  );
}

export default App;
