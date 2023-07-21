import './App.css';
import { useState, useEffect, useRef } from 'react';
import { ThemeProvider } from '@mui/material';
import { theme } from './services/Themes/Theme';
import { Route, Routes } from 'react-router-dom';
import AppNavbar from './components/Navbar/AppNavbar';
import Home from './pages/Home';
import BlogPostsByCategory from './pages/BlogPostsByCategory';
import AppSearch from './components/Search/AppSearch';
import SearchedPosts from './pages/SearchedPosts';
import BlogArticle from './pages/BlogArticle';
import Lottie from 'lottie-react';
import mainLoader from './services/Animation/loaderTwo.json';
import Map from './components/Map/Map';

const App = () => {
  const [loading, setLoading] = useState(true);
  const animationRef = useRef();

  // animation control
  useEffect(() => {
    const loaderTimeout = setTimeout(() => {
      setLoading(false);
      animationRef.current.pause();
    }, 3000);
    return () => {
      clearTimeout(loaderTimeout);
    };
  }, [loading]);

  return (
    <ThemeProvider theme={theme}>
      {loading ? (
        <div className="mainloader-container">
          <Lottie animationData={mainLoader} lottieRef={animationRef} />
        </div>
      ) : (
        <div>
          <AppNavbar />
          <main className="content">
            <div className="search-container">
              <AppSearch />
            </div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/blogPosts/:slug"
                element={<BlogPostsByCategory />}
              />
              <Route path="/search/:slug" element={<SearchedPosts />} />
              <Route path="/article/:slug" element={<BlogArticle />} />
              <Route path="/map" element={<Map />} />
            </Routes>
          </main>
        </div>
      )}
    </ThemeProvider>
  );
};
export default App;
