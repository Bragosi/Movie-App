import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./MovieSlice";

export const store = configureStore({
  reducer: {
    movieData: movieReducer,
  },
});
