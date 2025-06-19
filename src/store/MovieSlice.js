import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bannerData: [],
  imageUrl : ""
};

export const MovieSlice = createSlice({
  name: "movie-app",
  initialState,
  reducers: {
    setBannerData: (state, action) => {
      state.bannerData = action.payload;
    },
    setImageUrl: (state, action)=>{
      state.imageUrl = action.payload
    }
  },
});

export const { setBannerData, setImageUrl } = MovieSlice.actions;
export default MovieSlice.reducer;
