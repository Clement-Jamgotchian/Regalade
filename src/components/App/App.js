import { Container } from 'react-bootstrap';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { MyLayout } from '../MyLayout';
import Loader from '../Loader/Loader';
import RecipeDetails from '../RecipeDetails/RecipeDetail';
import HomepageInscription from '../../pages/HomepageInscription/HomepageInscription';
import Profil from '../Profil/Profil';
import Faq from '../../pages/Faq/Faq';
import Homepage from '../../pages/Homepage/Homepage';
import List from '../../pages/List/List';
import MobilePages from '../../pages/MobilePages/MobilePages';
import Ingredient from '../Ingredient/Ingredient';
import Fridge from '../../pages/Fridge/Fridge';

function App() {
  const isWidthTrue = useSelector((state) => state.profil.isTrueWidth);

  return (
    <Container className="App">
      <Routes>
        <Route path="/" element={<HomepageInscription />} />
        <Route
          path="/recettes"
          element={(
            <MyLayout>
              <Homepage />
            </MyLayout>
          )}
        />
        <Route path="/profil" element={<Profil />} />
        <Route
          path="/profil/mes-recettes"
          element={isWidthTrue ? <MyLayout><MobilePages /></MyLayout> : <Profil />}
        />
        <Route
          path="/profil/mes-favorites"
          element={isWidthTrue ? <MyLayout><MobilePages /></MyLayout> : <Profil />}
        />
        <Route
          path="/profil/mes-ingredients"
          element={
            isWidthTrue ? (
              <MyLayout>
                <Fridge />
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
                <List />
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
                <Ingredient />
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
        <Route
          path="/recette/:id"
          element={
            // <MyLayout>
            <RecipeDetails />
            // </MyLayout>
            }
        />
        <Route path="/faq" element={<Faq />} />
      </Routes>
    </Container>
  );
}

export default App;
