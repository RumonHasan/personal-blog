import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { FormControl } from '@mui/material';
import Typography from '@mui/material/Typography';
import { InputLabel, MenuItem, Select } from '@mui/material';
import { Link } from 'react-router-dom';
import './AppNavbarStyles.css';
import { useDispatch, useSelector } from 'react-redux';
import { setBlogPostsCategories } from '../../store/projectSlice';
import { colors } from '../../services/Themes/Colors';
import LanguageIcon from '@mui/icons-material/Language';
import InfoIcon from '@mui/icons-material/Info';
import { Visibility } from '@mui/icons-material';
// graph ql stuff
import { graphcms, QUERY_SLUG_CATEGORIES } from '../../Graphql/Queries';

const drawerWidth = 200;

const AppNavbar = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categorySelect, setCategorySelect] = useState('');
  const projectCategories = useSelector((data) => data.mainReducer.categories);
  const dispatch = useDispatch();

  const handleCategoryChange = (event) => {
    setCategorySelect(event.target.value);
  };

  // fetching the blog post categories
  useEffect(() => {
    graphcms
      .request(QUERY_SLUG_CATEGORIES)
      .then((data) => dispatch(setBlogPostsCategories(data.categories)));
  }, [dispatch]);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  // jump to project categories
  const jumpToCategoryBasedPosts = (category) => {
    const { slug } = category;
    const categorySlugRoute = `/blogPosts/${slug}`;
    return categorySlugRoute;
  };

  // for mobile
  const DrawerCategories = () => {
    return (
      <>
        {projectCategories.map((category) => (
          <ListItem key={category.slug}>
            <ListItemButton>
              <Link
                to={jumpToCategoryBasedPosts(category)}
                className="category-link category-select-item"
              >
                <Typography>{category.name}</Typography>
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </>
    );
  };

  // mobile drawer
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <Link to="/" className="category-link category-select-item">
          R BLOG (Beta)
        </Link>
      </Typography>
      <Divider />
      <List>
        <ListItem>
          <ListItemButton>
            <Link className="category-link" to={'/about'}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography sx={{ paddingRight: '7px' }}>About Me</Typography>
                <InfoIcon fontSize="small" />
              </Box>
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <Link className="category-link" to={'/map'}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography sx={{ paddingRight: '7px' }}>Explore</Typography>
                <LanguageIcon fontSize="small" />
              </Box>
            </Link>
          </ListItemButton>
        </ListItem>
        {/* popular list items */}
        <ListItem>
          <ListItemButton>
            <Link className="category-link" to={'/popular'}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography sx={{ paddingRight: '7px' }}>Popular</Typography>
                <Visibility />
              </Box>
            </Link>
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemButton>
            <Link to="/" className="category-link category-select-item">
              <Typography>All Blogs</Typography>
            </Link>
          </ListItemButton>
        </ListItem>

        <DrawerCategories />
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <Link to="/" className="category-link">
              <Typography fontFamily="Arial">Rumon`s BLOG (Beta)</Typography>
            </Link>
          </Typography>
          {/** Link to about page */}
          <Box
            sx={{ display: { xs: 'none', sm: 'block' }, marginRight: '32px' }}
          >
            <Link className="category-link" to={'/about'}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography sx={{ paddingRight: '7px' }}>About Me</Typography>
                <InfoIcon fontSize="small" />
              </Box>
            </Link>
          </Box>
          {/** Link to map */}
          <Box
            sx={{ display: { xs: 'none', sm: 'block' }, marginRight: '32px' }}
          >
            <Link className="category-link" to={'/map'}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography sx={{ paddingRight: '7px' }}>Explore</Typography>
                <LanguageIcon fontSize="small" />
              </Box>
            </Link>
          </Box>

          {/** popular menu item */}
          <Box
            sx={{ display: { xs: 'none', sm: 'block' }, marginRight: '32px' }}
          >
            <Link className="category-link" to={'/popular'}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography sx={{ paddingRight: '7px' }}>Popular</Typography>
                <Visibility />
              </Box>
            </Link>
          </Box>

          <Box
            sx={{ display: { xs: 'none', sm: 'block' } }}
            className="category-container"
          >
            {/*Blog Categories */}
            <FormControl sx={{ width: 200 }}>
              <InputLabel id="select-label" sx={{ color: 'white' }}>
                Category
              </InputLabel>
              <Select
                MenuProps={{
                  sx: {
                    '& .MuiPaper-root': {
                      backgroundColor: colors.MAIN_BLUE,
                    },
                  },
                }}
                className="category-select"
                labelId="select-label"
                value={categorySelect}
                onChange={handleCategoryChange}
              >
                <MenuItem value="All">
                  {' '}
                  <Link
                    to="/"
                    className="category-link category-select-item category-all"
                  >
                    All Posts
                  </Link>
                </MenuItem>
                {projectCategories.map((category) => {
                  const { slug, name } = category;
                  return (
                    <MenuItem value={name} key={slug}>
                      <Link
                        to={jumpToCategoryBasedPosts(category)}
                        className="category-link category-select-item"
                      >
                        {name}
                      </Link>
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          PaperProps={{ sx: { backgroundColor: colors.MAIN_BLUE } }}
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

AppNavbar.propTypes = {
  window: PropTypes.func,
};

export default AppNavbar;
