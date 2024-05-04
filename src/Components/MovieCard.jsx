import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MovieCard = ({ movie }) => {
  const { id, title, overview, poster_path, release_date } = movie;
  const [isHovered, setIsHovered] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);

  const navigate = useNavigate();

  // Function to check if the movie is already a favorite
  const checkFavoriteStatus = async () => {
    try {
      const favoritesResponse = await axios.get('http://localhost:3001/favourites');
      const isFav = favoritesResponse.data.some(favMovie => favMovie.id === movie.id);
      setIsFavorite(isFav);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  // Call checkFavoriteStatus when the component mounts
  React.useEffect(() => {
    checkFavoriteStatus();
  }, []);

  const handleCardClick = (id) => {
    console.log("Card Clicked with id", id);
    navigate(`/Movies/${id}`);
  };

  const handleFavoriteIconClick = async (event) => {
    event.stopPropagation();
    const movieUrl = `http://localhost:3001/movies/${id}`;
    const favoritesUrl = 'http://localhost:3001/favourites';

    try {
      if (!isFavorite) {
        // If not already a favorite, add to favorites
        const response = await axios.get(movieUrl);
        await axios.post(favoritesUrl, response.data);
      } else {
        // If already a favorite, remove from favorites
        await axios.delete(`${favoritesUrl}/${id}`);
      }
      setIsFavorite(!isFavorite); // Toggle the favorite state
    } catch (error) {
      console.error('Error handling favorite icon click:', error);
    }
  };

  return (
    <Card
      sx={{
        width: 300,
        height: '100%',
        margin: '10px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
      onClick={() => handleCardClick(movie.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardMedia
        sx={{
          height: 0,
          paddingTop: '150%',
          cursor: 'pointer',
          position: 'relative',
          '&:hover': {
            '& .favoriteIcon': {
              opacity: 1,
            },
          },
        }}
        image={`${poster_path}`}
        title={title}
      >
        {isHovered && (
          <IconButton
            sx={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              opacity: 0,
              transition: 'opacity 0.3s ease',
              color: 'white',
            }}
            onClick={handleFavoriteIconClick}
            className="favoriteIcon"
          >
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
          </IconButton>
        )}
      </CardMedia>
      <CardContent
        sx={{
          flex: '1 0 auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          noWrap
          gutterBottom
          variant="h5"
          component="div"
          sx={{ flex: '0 1 auto' }}
        >
          <Link color="inherit" underline="none">
            {title}
          </Link>
        </Typography>
        <div>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ maxHeight: 80, overflow: 'hidden' }}
          >
            {overview}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Release Date: {release_date}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default function MediaCard({ movies }) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}