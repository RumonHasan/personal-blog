import React, { useEffect } from 'react';
import { graphcms, QUERY_BLOG_POSTS } from '../Graphql/Queries';
import Posts from '../components/Posts/Posts';
import { useSelector, useDispatch } from 'react-redux';
import { setBlogPosts } from '../store/projectSlice';

const Home = () => {
  const blogPosts = useSelector((data) => data.mainReducer.blogPosts);
  const dispatch = useDispatch();

  // getting the blog posts
  useEffect(() => {
    graphcms
      .request(QUERY_BLOG_POSTS)
      .then(({ blogPosts }) => dispatch(setBlogPosts(blogPosts)));
  }, [dispatch]);

  return (
    <React.Fragment>
      <Posts blogPosts={blogPosts} />
    </React.Fragment>
  );
};

export default Home;
