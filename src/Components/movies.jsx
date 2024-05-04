import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import SimpleBackdrop from "./Spinner";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // axios
    //   .get("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=9813ce01a72ca1bd2ae25f091898b1c7")
    //   .then((res) => {
    //     saveMoviesToDB(res.data.results);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    fetchMoviesFromDB();
  },[]);

  // const saveMoviesToDB = (moviesData) => {
  //   axios.get('http://localhost:3000/movies')
  //     .then(response => {
  //       if (response.data.length === 0) {
  //         axios.post('http://localhost:3000/movies', { movies: moviesData }) 
  //           .then(postResponse => {
  //             console.log('Data saved to db.json', postResponse.data);
  //             fetchMoviesFromDB();
  //           })
  //           .catch(postError => {
  //             console.error('Error saving data', postError);
  //           });
  //       } else {
  //         console.log('Movies data already exists in db.json');
  //         fetchMoviesFromDB();
  //       }
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data', error);
  //     });
  // };

  const fetchMoviesFromDB = () => {
    axios.get('http://localhost:3001/movies')
      .then(response => {
        console.log(response.data);
        setMovies(response.data);
      })
      .catch(error => {
        console.error('Error fetching movies data', error);
      });
  };

  if (movies.length === 0) return <SimpleBackdrop />;

  return (
    <div>
      {movies && <MovieCard movies={movies} />}
    </div>
  );
};

export default Movies;