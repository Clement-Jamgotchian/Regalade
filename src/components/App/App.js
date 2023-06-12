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
import RecipeDetails from '../RecipeDetails/RecipeDetail';
// import HomepageInscription from '../HomepageInscription/HomepageInscription';
// import Loader from '../Loader/Loader';

function App() {
  const isLoading = useSelector((state) => state.user.isLoading);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isInvitedIn = useSelector((state) => state.user.isInvitedIn);

  if (isLoggedIn || isInvitedIn) {
    return (
      <Container fluid className="App">
        <Header />
        <Menuphone />
        <Routes>
          <Route
            path="/"
            element={
              <Recipes />
              }
          />
          <Route path="/recette/:id" element={<RecipeDetails />} />
          <Route path="/faq" element={<Faq />} />
        </Routes>
        {isLoading && <Loader />}

        {/* <Loader /> */}
        {/* <HomepageInscription /> */}
        <Footer />
      </Container>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<HomepageInscription />} />
    </Routes>
  );
}

export default App;
