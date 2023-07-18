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
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import './AppNavbarStyles.css';
import { useDispatch, useSelector } from 'react-redux';
import { setBlogPostsCategories } from '../../store/projectSlice';

// graph ql stuff
import { graphcms, QUERY_SLUG_CATEGORIES } from '../../Graphql/Queries';

const drawerWidth = 200;

const AppNavbar = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const projectCategories = useSelector((data) => data.mainReducer.categories);
  const dispatch = useDispatch();

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
  const jumpToCategoryBasedPosts = (categorySlug) => {
    const categorySlugRoute = `/blogPosts/${categorySlug}`;
    return categorySlugRoute;
  };

  // for mobile
  const DrawerCategories = () => {
    return (
      <>
        {projectCategories.map((category) => (
          <ListItem key={category.slug}>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <Link to={jumpToCategoryBasedPosts(category.slug)}>
                {category.name}
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
        <Link to="/" className="logo">
          R BLOG
        </Link>
      </Typography>
      <Divider />
      <List>
        <ListItem>
          <ListItemButton>
            <Link to="/">All</Link>
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
            <Link to="/" className="logo">
              <Typography fontFamily="Arial">R BLOG</Typography>
            </Link>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button>
              <Link to="/" className="logo">
                All Blog Posts
              </Link>
            </Button>
            {projectCategories.map((category) => (
              <Button key={category.slug}>
                <Link
                  to={jumpToCategoryBasedPosts(category.slug)}
                  className="logo"
                >
                  {category.name}
                </Link>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
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
