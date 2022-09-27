import { configureStore } from "@reduxjs/toolkit";
import typePokemonSlice from "./slice/typePokemon.slice";
import userTrainerSlice from "./slice/userTrainer.slice";

export default configureStore({
  reducer: {
    pokemon: typePokemonSlice,
    userTrainer: userTrainerSlice,
  },
});
