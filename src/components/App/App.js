import { Container } from 'react-bootstrap';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import HomepageInscription from '../HomepageInscription/HomepageInscription';

import RecipeCard from '../RecipeCard/RecipeCard';

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<HomepageInscription />} />
        <Route
          path="/home"
          element={
            <RecipeCard />
            }
        />
      </Routes>
    </Container>
  );
}

export default App;
