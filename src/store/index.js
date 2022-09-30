import { configureStore } from "@reduxjs/toolkit";
import avatarSlice from "./slice/avatar.slice";
import loadingScreenSlice from "./slice/loadingScreen";
import typePokemonSlice from "./slice/typePokemon.slice";
import userTrainerSlice from "./slice/userTrainer.slice";

export default configureStore({
  reducer: {
    pokemon: typePokemonSlice,
    userTrainer: userTrainerSlice,
    avatar:avatarSlice,
    setLoadingScreen: loadingScreenSlice
  },
});
