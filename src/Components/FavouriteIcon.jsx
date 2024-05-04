import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavoritesCount } from '../redux/store/Redux Thunk/fetchFavorites';
import store from '../redux/store/store';
import IconButton from '@mui/material/IconButton';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MenuItem from '@mui/material/MenuItem';

const ProfileButton = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  backgroundColor: '#1976d2',
  color: 'white',
  padding: '8px',
  borderRadius: '20px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#135ca3',
  },
});

const FavoritesCount = () => {
    let navigate = useNavigate();
  const dispatch = useDispatch();
  const favoritesCount = useSelector((state) => state.favorites.count);
  
  useEffect(() => {
    dispatch(fetchFavoritesCount());

    const unsubscribe = store.subscribe(() => {
      dispatch(fetchFavoritesCount());
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  const handleFavoritesClick = () => {
    navigate(`/fav`);
  };

  return (
    <MenuItem>
    <IconButton size="large" aria-label="show favorites" color="inherit" onClick={handleFavoritesClick}>
        <Badge badgeContent={favoritesCount} color="error">
        <FavoriteIcon />
        </Badge>
    </IconButton>
    </MenuItem>

  );
};

export default FavoritesCount;
