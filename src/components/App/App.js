import { Container } from 'react-bootstrap';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Recipes from '../Recipes/Recipes';
import HomepageInscription from '../HomepageInscription/HomepageInscription';

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<HomepageInscription />} />
        <Route path="/home" element={<Recipes />} />
        <Route
          path="*"
          element={(
            <div>
              <h1>404 Page not found</h1>
            </div>
            )}
        />
      </Routes>
    </Container>
  );
}

export default App;
