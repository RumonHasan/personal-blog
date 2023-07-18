import './App.css';
import React from 'react';
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
    <React.Fragment>
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
      <AppFooter />
    </React.Fragment>
  );
};
export default App;
