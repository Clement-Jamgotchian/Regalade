import { Container } from 'react-bootstrap';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Recipes from '../Recipes/Recipes';
import Loader from '../Loader/Loader';
import Faq from '../Faq/Faq';
import RecipeDetails from '../RecipeDetails/RecipeDetail';
import HomepageInscription from '../HomepageInscription/HomepageInscription';
// import HomepageInscription from '../HomepageInscription/HomepageInscription';
// import Loader from '../Loader/Loader';

function App() {
  const isLoading = useSelector((state) => state.user.isLoading);
  // const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  // const isInvitedIn = useSelector((state) => state.user.isInvitedIn);

  return (
    <Container fluid className="App">
      <Routes>
        <Route path="/" element={<HomepageInscription />} />
        <Route
          path="/home"
          element={
            <Recipes />
              }
        />
        <Route path="/recette/:id" element={<RecipeDetails />} />
        <Route path="/faq" element={<Faq />} />
      </Routes>
      {isLoading && <Loader />}
    </Container>
  );
}

export default App;
