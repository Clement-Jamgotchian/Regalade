import { Container } from 'react-bootstrap';
import './App.scss';

import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { MyLayout } from '../MyLayout';
import RecipeDetails from '../RecipeDetails/RecipeDetail';
import HomepageInscription from '../../pages/HomepageInscription/HomepageInscription';
import Profil from '../Profil/Profil';
import Faq from '../../pages/Faq/Faq';
import Homepage from '../../pages/Homepage/Homepage';
import List from '../../pages/List/List';
import Fridge from '../../pages/Fridge/Fridge';
import Cart from '../../pages/Cart/Cart';
import MyInfos from '../../pages/MyInfos/MyInfos';
import CreateRecipe from '../../pages/CreateRecipe/CreateRecipe';
import RecipesPage from '../../pages/RecipesPage/RecipesPage';
import Favorites from '../../pages/Favorites/Favorites';
import ProtectedRoute from '../../utils/ProtectedRoutes';
import EditRecipe from '../../pages/EditRecipe/EditRecipe';
import ListCreate from '../../pages/ListCreate/ListeCreate';

function App() {
  const isWidthTrue = useSelector((state) => state.profil.isTrueWidth);
  const isUserInvited = useSelector((state) => state.user.tokenUser);

  return (
    <Container className="App">
      <Routes>
        <Route path="/welcome" element={<HomepageInscription />} />
        <Route
          path="/"
          element={(
            <MyLayout>
              <Homepage />
            </MyLayout>
          )}
        />
        <Route
          path="/recettes"
          element={(
            <MyLayout>
              <RecipesPage />
            </MyLayout>
          )}
        />
        <Route element={<ProtectedRoute isUserInvited={isUserInvited} />}>
          <Route path="/profil" element={<Profil />} />
          <Route
            path="/profil/mes-recettes"
            element={
              isWidthTrue ? (
                <MyLayout>
                  <ListCreate />
                </MyLayout>
              ) : (
                <Profil />
              )
            }
          />
          <Route
            path="/profil/mes-favorites"
            element={
              isWidthTrue ? (
                <MyLayout>
                  <Favorites />
                </MyLayout>
              ) : (
                <Profil />
              )
            }
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
                <Cart />
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
                <MyInfos />
              </MyLayout>
            ) : (
              <Profil />
            )
          }
          />
          <Route
            path="/recette/creation"
            element={
              <CreateRecipe />
          }
          />
          <Route
            path="/recette/modification"
            element={
              <EditRecipe />
            }
          />
        </Route>
        <Route
          path="/recette/:idRecette"
          element={(
            <RecipeDetails />
          )}
        />
        <Route
          path="/FAQ"
          element={(
            <MyLayout>
              <Faq />
            </MyLayout>
          )}
        />
        <Route
          path="/*"
          element={(
            <MyLayout>
              <h1 className="text-center mb-4">
                Erreur 404, cette page n&apos;existe pas
              </h1>
            </MyLayout>
      )}
        />
      </Routes>
    </Container>
  );
}

export default App;
