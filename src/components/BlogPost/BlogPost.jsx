import { Container } from '@mui/material';
import PropTypes from 'prop-types';

const BlogPost = (props) => {
  const {
    categories,
    content,
    coverImage,
    createdAt,
    updatedAt,
    description,
    id,
    slug,
    title,
  } = props;
  console.log(content);
  return <Container maxWidth="md"></Container>;
};

BlogPost.propTypes = {
  coverImage: PropTypes.any,
  slug: PropTypes.any,
  id: PropTypes.any,
  title: PropTypes.any,
  content: PropTypes.any,
  description: PropTypes.any,
  createdAt: PropTypes.any,
  updatedAt: PropTypes.any,
  categories: PropTypes.any,
};

export default BlogPost;
