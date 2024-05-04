import React, { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddMoviePage = () => {
  const [movieData, setMovieData] = useState({
    id: '',
    adult: false,
    original_title: '',
    title: '',
    overview: '',
    popularity: 0,
    poster_path: 'https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie-768x1129.jpg',
    release_date: '',
    vote_average: 0,
    vote_count: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/movies')
      .then(response => {
        const movies = response.data;
        if (movies.length > 0) {
          const lastId = parseInt(movies[movies.length - 1].id);
          setMovieData(prevData => ({ ...prevData, id: (lastId + 1).toString() }));
        }
      })
      .catch(error => console.error(error));
  }, []);

  const validateForm = () => {
    const { poster_path, overview, vote_average, release_date, vote_count } = movieData;
    
    if (!poster_path.endsWith('.png') && !poster_path.endsWith('.jpg')) {
      alert('Poster Path must be a link to a PNG or JPG image.');
      return false;
    }
    if (overview.length < 100) {
      alert('Overview must be at least 100 characters.');
      return false;
    }
    if (vote_average > 10 || vote_average < 0) {
      alert('Vote average must be between 0 and 10.');
      return false;
    }
    if (isNaN(Date.parse(release_date))) {
      alert('Release date must be a valid date.');
      return false;
    }
    if (isNaN(movieData.popularity) || movieData.popularity < 0) {
      alert('Popularity must be a positive number.');
      return false;
    }
    if (isNaN(vote_count) || vote_count < 0) {
      alert('Vote count must be a positive number.');
      return false;
    }
    
    return true;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    axios
      .post('http://localhost:3001/movies', movieData)
      .then((response) => {
        console.log('Movie added successfully.');
        navigate(`/`);
      })
      .catch((error) => {
        console.error(error);
        alert('Add failed.');
      });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setMovieData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  return (
    <div className="container" style={{ marginTop: '20px' }}>
      <h1>Add Movie</h1>
      <form onSubmit={handleFormSubmit} className="row g-3">
        <div className="col-md-6">
          <label htmlFor="original_title" className="form-label">
            Original Title
          </label>
          <input
            type="text"
            className="form-control"
            id="original_title"
            name="original_title"
            value={movieData.original_title}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={movieData.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-12">
          <label htmlFor="overview" className="form-label">
            Overview
          </label>
          <textarea
            className="form-control"
            id="overview"
            name="overview"
            value={movieData.overview}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="col-md-6">
          <label htmlFor="popularity" className="form-label">
            Popularity
          </label>
          <input
            type="number"
            className="form-control"
            id="popularity"
            name="popularity"
            value={movieData.popularity}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6">
         <label htmlFor="poster_path" className="form-label">
            Poster Path
          </label>
          <input
            type="text"
            className="form-control"
            id="poster_path"
            name="poster_path"
            value={movieData.poster_path}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="release_date" className="form-label">
            Release Date
          </label>
          <input
            type="date"
            className="form-control"
            id="release_date"
            name="release_date"
            value={movieData.release_date}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="vote_average" className="form-label">
            Vote Average
          </label>
          <input
            type="number"
            step="0.1"
            className="form-control"
            id="vote_average"
            name="vote_average"
            value={movieData.vote_average}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="vote_count" className="form-label">
            Vote Count
          </label>
          <input
            type="number"
            className="form-control"
            id="vote_count"
            name="vote_count"
            value={movieData.vote_count}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-1 d-flex justify-content-between align-items-center">
          <label className="form-label" htmlFor="adult">
            Adult
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            id="adult"
            name="adult"
            checked={movieData.adult}
            onChange={handleInputChange}
            style={{ marginLeft: 'auto' }}
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary" style={{marginBottom:'20px'}}>
            Add Movie
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMoviePage;