import './App.css';
import { ThemeProvider } from '@mui/material';
import { theme } from './services/Themes/Theme';
import { Route, Routes } from 'react-router-dom';
import AppNavbar from './components/Navbar/AppNavbar';
import Home from './pages/Home';
import AppFooter from './components/Footer/AppFooter';
import BlogPostsByCategory from './pages/BlogPostsByCategory';
import AppSearch from './components/Search/AppSearch';
import SearchedPosts from './pages/SearchedPosts';
import BlogArticle from './pages/BlogArticle';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppNavbar />
      <div className="search-container">
        <AppSearch />
      </div>
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogPosts/:slug" element={<BlogPostsByCategory />} />
          <Route path="/search/:slug" element={<SearchedPosts />} />
          <Route path="/article/:slug" element={<BlogArticle />} />
        </Routes>
      </main>
      {/* <footer style={{ bottom: 0 }} className="footer">
        <AppFooter />
      </footer> */}
    </ThemeProvider>
  );
};
export default App;
