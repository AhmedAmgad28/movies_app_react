import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    count: 0,
  },
  reducers: {
    setFavoritesCount(state, action) {
      state.count = action.payload;
    },
  },
});

export const { setFavoritesCount } = favoritesSlice.actions;
export default favoritesSlice.reducer;
