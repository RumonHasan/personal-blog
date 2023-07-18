import React, { useState, useEffect } from 'react';
import { graphcms, QUERY_BLOG_POSTS } from '../Graphql/Queries';
import Posts from '../components/Posts/Posts';

const Home = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  // getting the blog posts
  useEffect(() => {
    graphcms
      .request(QUERY_BLOG_POSTS)
      .then(({ blogPosts }) => setBlogPosts(blogPosts));
  }, []);

  return (
    <React.Fragment>
      <Posts blogPosts={blogPosts} />
    </React.Fragment>
  );
};

export default Home;
