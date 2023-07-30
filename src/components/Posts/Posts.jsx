import { Grid } from '@mui/material';
import AppCard from '../Card/AppCard';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  setLatestBlogPost,
  setLatestUpdatedBlogPost,
} from '../../store/projectSlice';
import { useEffect } from 'react';

const Posts = ({ blogPosts }) => {
  const dispatch = useDispatch();

  // saving the id of the latest blog post
  useEffect(() => {
    if (blogPosts.length) {
      const getLatestBlogExtracts = (type) => {
        let blogDateExtract = blogPosts.map((blog) => {
          const { createdAt, id, updatedAt } = blog;
          const createdAtOrUpdatedString =
            new Date(type === 'createdAt' ? createdAt : updatedAt).getTime() /
            1000;
          return [id, createdAtOrUpdatedString];
        });
        return blogDateExtract;
      };
      const createdBlogs = getLatestBlogExtracts('createdAt').sort(
        (a, b) => b[1] - a[1]
      );
      const updatedBlogs = getLatestBlogExtracts('updatedAt').sort(
        (a, b) => b[1] - a[1]
      );
      dispatch(setLatestBlogPost(createdBlogs[0][0]));
      dispatch(setLatestUpdatedBlogPost(updatedBlogs[0][0]));
    }
  }, [blogPosts, dispatch]);

  return (
    <Grid container spacing={4} style={{ padding: '0 40px' }}>
      {blogPosts.map((post) => {
        return (
          <Grid item key={post.id} xs={12} sm={6} md={4}>
            <AppCard {...post} />
          </Grid>
        );
      })}
    </Grid>
  );
};

Posts.propTypes = {
  blogPosts: PropTypes.any,
};

export default Posts;
