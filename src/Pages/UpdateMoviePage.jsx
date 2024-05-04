import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateMoviePage = () => {
  const [movieData, setMovieData] = useState({});
  const { MovieId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/movies/${MovieId}`)
      .then((response) => {
        const desiredMovie = response.data;

        if (desiredMovie) {
          setMovieData(desiredMovie);
        } else {
          console.log('Movie not found.');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [MovieId]);

  if (!movieData) {
    return <div>Loading...</div>;
  }

  const { title, poster_path, overview, release_date, vote_average } = movieData;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!poster_path.endsWith('.png') && !poster_path.endsWith('.jpg')) {
      alert('Poster Path must be a link to a PNG or JPG image.');
      return;
    }
    if (movieData.overview.length < 100) {
      alert('Overview must be at least 100 characters.');
      return;
    }
    if (movieData.vote_average > 10 || movieData.vote_average < 0) {
      alert('Vote average must be between 0 and 10.');
      return;
    }
    if (isNaN(Date.parse(movieData.release_date))) {
      alert('Release date must be a valid date.');
      return;
    }
    if (isNaN(movieData.popularity) || movieData.popularity < 0) {
      alert('Popularity must be a positive number.');
      return;
    }
    if (isNaN(movieData.vote_count) || movieData.vote_count < 0) {
      alert('Vote count must be a positive number.');
      return;
    }

    
    axios
      .put(`http://localhost:3001/movies/${MovieId}`, movieData)
      .then((response) => {
        console.log('Movie updated successfully.');
        navigate(`/movies/${MovieId}`);
      })
      .catch((error) => {
        console.error(error);
        alert('Update failed.');
      });
  };

  return (
    <div className="container" style={{ marginTop: '20px' }}>
      <h1>Update Movie</h1>
      <form onSubmit={handleFormSubmit} className="form-horizontal">
        <div className="form-group row" style={{marginTop:'20px'}}>
          <label className="col-sm-3 col-form-label">Title:</label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              value={movieData.title}
              onChange={(e) => setMovieData({ ...movieData, title: e.target.value })}
            />
          </div>
        </div>
        <div className="form-group row" style={{marginTop:'20px'}}>
          <label className="col-sm-3 col-form-label">Poster Path:</label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              value={movieData.poster_path}
              onChange={(e) => setMovieData({ ...movieData, poster_path: e.target.value })}
            />
          </div>
        </div>
        <div className="form-group row" style={{marginTop:'20px'}}>
          <label className="col-sm-3 col-form-label">Overview:</label>
          <div className="col-sm-9">
            <textarea
              className="form-control"
              value={movieData.overview}
              onChange={(e) => setMovieData({ ...movieData, overview: e.target.value })}
            />
          </div>
        </div>
        <div className="form-group row" style={{marginTop:'20px'}}>
          <label className="col-sm-3 col-form-label">Release Date:</label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              value={movieData.release_date}
              onChange={(e) => setMovieData({ ...movieData, release_date: e.target.value })}
            />
          </div>
        </div>
        <div className="form-group row" style={{marginTop:'20px'}}>
          <label className="col-sm-3 col-form-label">Vote Average:</label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              value={movieData.vote_average}
              onChange={(e) => setMovieData({ ...movieData, vote_average: parseFloat(e.target.value) })}
            />
          </div>
        </div>
        <div className="form-group row" style={{marginTop:'20px'}}>
          <label className="col-sm-3 col-form-label">Vote Count:</label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              value={movieData.vote_count}
              onChange={(e) => setMovieData({ ...movieData, vote_count: parseInt(e.target.value, 10) })}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>Update</button>
      </form>
    </div>
  );
};

export default UpdateMoviePage;