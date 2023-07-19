import { Typography, LinearProgress, Card, CardContent } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import './BlogPostStyles.css';

const BlogPost = (props) => {
  const {
    categories,
    content,
    coverImage,
    createdAt,
    updatedAt,
    id,
    slug,
    title,
  } = props;
  const [blogLoading, setBlogLoading] = useState(true);
  const [blogContent, setBlogContent] = useState(null);

  // generating the blog content asynchronously in order to prevent initial render error
  useEffect(() => {
    const generateBlogContent = async () => {
      const timeout = setTimeout(() => {
        if (content.html && content) {
          setBlogLoading(false);
          setBlogContent(content.html);
        }
      }, 1500);
      return () => {
        clearTimeout(timeout);
      };
    };
    generateBlogContent();
  }, [content]);

  return (
    <Card className="card-container">
      <Typography variant="h3" sx={{ fontSize: { xs: '2rem', sm: '4rem' } }}>
        {title}
      </Typography>
      <CardContent>
        {' '}
        {blogLoading ? (
          <LinearProgress />
        ) : (
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: blogContent }}
          />
        )}
      </CardContent>
    </Card>
  );
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
