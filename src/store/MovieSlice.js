import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bannerData: [],
};

export const MovieSlice = createSlice({
  name: "movie-app",
  initialState,
  reducers: {
    setBannerData: (state, action) => {
      state.bannerData = action.payload;
    },
  },
});

export const { setBannerData } = MovieSlice.actions;
export default MovieSlice.reducer;
