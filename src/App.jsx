import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Pokedex from "./routes/Pokedex";
import PokemonInfo from "./routes/PokemonInfo";
import ProtectedRoutes from "./routes/ProtectedRoutes";

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/pokedex" element={<Pokedex />} />
            <Route path="/pokedex/:id" element={<PokemonInfo />} />
          </Route>
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
