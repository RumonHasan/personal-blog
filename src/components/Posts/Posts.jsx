import { Grid } from '@mui/material';
import AppCard from '../Card/AppCard';
import PropTypes from 'prop-types';

const Posts = ({ blogPosts }) => {
  return (
    <Grid container spacing={4} style={{ padding: '0 40px' }}>
      {blogPosts.map((post) => {
        return (
          <Grid item key={post.id} xs={12} sm={12} md={4}>
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
