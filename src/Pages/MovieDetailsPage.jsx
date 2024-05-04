import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const MovieDetailsPage = () => {
  const [movieData, setMovieData] = useState(null);
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

  const handleUpdateClick = () => {
    navigate(`/update/${MovieId}`);
  };

  const handleDeleteClick = () => {
    const userConfirmation = window.confirm('Are you sure you want to delete this movie?');

    if (userConfirmation) {
      axios
        .delete(`http://localhost:3001/movies/${MovieId}`)
        .then((response) => {
          console.log('Movie deleted successfully.');
          navigate('/movies');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div id="MainContainerDetails" style={{ background: '#f1f1f1', padding: '20px' }}>
      <div
        id="MovieDetails"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px',
          background: '#fff',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        <img
          src={`${poster_path}`}
          alt="movie1"
          style={{ width: '270px', marginRight: '20px' }}
        />
        <div className="Details">
          <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>{title}</h1>
          <p style={{ fontSize: '16px', marginBottom: '20px' }}>{overview}</p>
          <div className="SmallDetails">
            <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>Release Date: {release_date}</h2>
            <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>Rating: {vote_average}</h2>
          </div>
        </div>
      </div>
      <br></br>
      <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
      <Button variant="warning" type="submit" style={{marginRight: '10px'}} onClick={handleUpdateClick}>
        Update
      </Button>
      <Button variant="danger" type="submit" onClick={handleDeleteClick}>
        Delete
      </Button>
      </div>
    </div>
  );
};

export default MovieDetailsPage;