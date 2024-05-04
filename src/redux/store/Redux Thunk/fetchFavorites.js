import axios from "axios";
import { setFavoritesCount } from "../slices/favoritesSlice";

// Existing fetchFavoritesCount thunk
export const fetchFavoritesCount = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:3001/favourites');
    const favoritesCount = response.data.length;
    dispatch(setFavoritesCount(favoritesCount));
  } catch (error) {
    console.error('Error fetching favorites count:', error);
  }
};

// New thunk for adding a movie to favorites
export const addMovieToFavorites = (movieId) => async (dispatch) => {
  try {
    await axios.post('http://localhost:3001/favorites', { movieId });
    dispatch(fetchFavoritesCount());
  } catch (error) {
    console.error('Error adding movie to favorites:', error);
  }
};

// New thunk for removing a movie from favorites
export const removeMovieFromFavorites = (movieId) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:3001/favorites/${movieId}`);
    dispatch(fetchFavoritesCount());
  } catch (error) {
    console.error('Error removing movie from favorites:', error);
  }
};
