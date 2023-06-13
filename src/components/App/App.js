import { Container } from 'react-bootstrap';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Recipes from '../Recipes/Recipes';
import Loader from '../Loader/Loader';
import Faq from '../Faq/Faq';
import RecipeDetails from '../RecipeDetails/RecipeDetail';
import HomepageInscription from '../HomepageInscription/HomepageInscription';
import Profil from '../Profil/Profil';
import { MyLayout } from '../MyLayout';

function App() {
  const isWidthTrue = useSelector((state) => state.profil.isTrueWidth);

  return (
    <Container className="App">
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
        <Route path="/profil" element={<Profil />} />
        <Route
          path="/profil/mes-recettes"
          element={isWidthTrue ? <Recipes /> : <Profil />}
        />
        <Route
          path="/profil/mes-favorites"
          element={isWidthTrue ? <Recipes /> : <Profil />}
        />
        <Route
          path="/profil/mes-ingredients"
          element={
            isWidthTrue ? (
              <MyLayout>
                <Loader />
              </MyLayout>
            ) : (
              <Profil />
            )
          }
        />
        <Route
          path="/profil/mes-repas"
          element={
            isWidthTrue ? (
              <MyLayout>
                <Loader />
              </MyLayout>
            ) : (
              <Profil />
            )
          }
        />
        <Route
          path="/profil/mes-courses"
          element={
            isWidthTrue ? (
              <MyLayout>
                <Loader />
              </MyLayout>
            ) : (
              <Profil />
            )
          }
        />
        <Route
          path="/profil/mes-infos"
          element={
            isWidthTrue ? (
              <MyLayout>
                <Loader />
              </MyLayout>
            ) : (
              <Profil />
            )
          }
        />
        <Route path="/recette/:id" element={<RecipeDetails />} />
        <Route path="/faq" element={<Faq />} />
      </Routes>
    </Container>
  );
}

export default App;
