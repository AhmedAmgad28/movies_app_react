import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Badge from '@mui/material/Badge';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import axios from "axios";
import React, { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavoritesCount } from '../redux/store/Redux Thunk/fetchFavorites';
import FavouriteIcon2 from './FavouriteIcon';

const pages = [
    { title: 'Home', path: '/' },
    { title: 'Add Movie', path: '/Add' },
    { title: 'About Us', path: '/about' },
    { title: 'Contact Us', path: '/contactUs' },
  ];
const settings = [  { title: 'Profile', path: '/profile' },
                    { title: 'Favorites', path: '/fav' },
                    ];

function ResponsiveAppBar() {
  const dispatch = useDispatch();
  const favoritesCount = useSelector((state) => state.favorites.count);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  //const [favoritesCount, setFavoritesCount] = useState(0);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    //fetchFavoritesCount();
    fetchLoggedInUser();
  }, []);

  useEffect(() => {
    dispatch(fetchFavoritesCount());
  }, [dispatch]);

  const fetchLoggedInUser = () => {
    axios.get("http://localhost:3001/loggedInUser")
      .then((response) => {
        if (response.data.length > 0) {
          const userId = response.data[0].userId;
          fetchUserData(userId);
        } else {
          setUser(null);
        }
      })
      .catch((error) => {
        console.error("Error fetching logged in user data", error);
      });
  };

  const fetchUserData = (userId) => {
    axios.get(`http://localhost:3001/users/${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data", error);
      });
  };

  const handleLogout = () => {
    // Retrieve all loggedInUser entries
    axios.get('http://localhost:3001/loggedInUser')
      .then(loggedInResponse => {
        // Delete each loggedInUser entry one by one
        const deletePromises = loggedInResponse.data.map(loggedInUser => {
          return axios.delete(`http://localhost:3001/loggedInUser/${loggedInUser.id}`);
        });
        // Wait for all delete operations to complete
        Promise.all(deletePromises)
          .then(() => {
            navigate('/login');
          })
          .catch((error) => {
            console.error("Error deleting the loggedInUser data", error);
          });
      })
      .catch((error) => {
        console.error("Error retrieving the loggedInUser data", error);
      });
  };
  

  // const fetchFavoritesCount = () => {
  //   axios
  //     .get("http://localhost:3001/favourites")
  //     .then((response) => {
  //       setFavoritesCount(response.data.length);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching favorites data", error);
  //     });
  // };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleFavoritesClick = () => {
    navigate(`/fav`);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Movies Blog
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.title} onClick={handleCloseNavMenu} component={Link} to={page.path}>
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Cinema
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {pages.map((page) => (
              <Button
                key={page.title}
                component={Link}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          {/* <MenuItem>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit" onClick={handleFavoritesClick}>
              <Badge badgeContent={favoritesCount} color="error">
                <FavoriteIcon />
              </Badge>
            </IconButton>
          </MenuItem> */}
          <FavouriteIcon2></FavouriteIcon2>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user?.username} src={user?.imgPath || '/static/images/avatar/2.jpg'} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {user ? (
            <div>
              {settings.map((setting) => (
                <MenuItem key={setting.title} onClick={handleCloseNavMenu} component={Link} to={setting.path}>
                  <Typography textAlign="center">{setting.title}</Typography>
                </MenuItem>
              ))}
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </div>
          ) : (
            <MenuItem onClick={() => navigate('/login')}>
              <Typography textAlign="center">Login</Typography>
            </MenuItem>
          )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;