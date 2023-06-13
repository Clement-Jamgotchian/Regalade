import { Container } from 'react-bootstrap';
import './App.scss';
import { Route, Routes } from 'react-router-dom';

import Recipes from '../Recipes/Recipes';
import Faq from '../Faq/Faq';
import RecipeDetails from '../RecipeDetails/RecipeDetail';
import HomepageInscription from '../HomepageInscription/HomepageInscription';
import { MyLayout } from '../MyLayout';

function App() {
  return (
    <Container fluid className="App">
      <Routes>
        <Route path="/" element={<HomepageInscription />} />
        <Route
          path="/home"
          element={(
            <MyLayout>
              <Recipes />
            </MyLayout>
          )}
        />
        <Route path="/recette/:id" element={<RecipeDetails />} />
        <Route path="/faq" element={<Faq />} />
      </Routes>
    </Container>
  );
}

export default App;
