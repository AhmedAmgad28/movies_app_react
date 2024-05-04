import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../Components/MovieCard";

const Favourites = () => {
  const [movies, setMovies] = useState([]);

//   useEffect(() => {
//     fetchMoviesFromDB();
//   }, [movies]);

    useEffect(() => {
        fetchMoviesFromDB();
    }, [movies]);

  const fetchMoviesFromDB = () => {
    axios
      .get('http://localhost:3001/favourites')
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => {
        console.error('Error fetching movies data', error);
      });
  };

  if (movies.length === 0)return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>No favorites yet!</h2>
    </div>
  );
  
  return (
    <div>
      {movies && <MovieCard movies={movies} />}
    </div>
  );
}

export default Favourites;