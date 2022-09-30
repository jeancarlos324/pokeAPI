import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Pokedex from "./routes/Pokedex";
import PokemonInfo from "./routes/PokemonInfo";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import LoadingScreen from "./components/LoadingScreen";
import { useSelector } from "react-redux";

function App() {
  const isActiveScreen = useSelector((state) => state.setLoadingScreen);
  console.log(isActiveScreen);
  return (
    <HashRouter>
      <div className="App">
        {isActiveScreen && <LoadingScreen />}
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
