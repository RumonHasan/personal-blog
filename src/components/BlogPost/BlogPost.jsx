import {
  Typography,
  LinearProgress,
  Card,
  CardContent,
  Box,
  Switch,
  CardActions,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import './BlogPostStyles.css';
import { purifyDOMContent } from '../../utils/general';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const BlogPost = (props) => {
  const { content, createdAt, title } = props;
  const [blogLoading, setBlogLoading] = useState(true);
  const [blogContent, setBlogContent] = useState(null);
  const [postDarkMode, setPostDarkMode] = useState('light');
  // setting card default dark mode
  const customTheme = createTheme({
    palette: {
      mode: postDarkMode,
    },
  });
  const handlePostThemeChange = () => {
    setPostDarkMode(postDarkMode === 'light' ? 'dark' : 'light');
  };

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
    <ThemeProvider theme={customTheme}>
      <Card className="card-container">
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          width="100%"
        >
          <Typography
            variant="h3"
            sx={{ fontSize: { xs: '2rem', sm: '4rem' } }}
          >
            {title}
          </Typography>
          <Box>
            <Switch
              checked={postDarkMode === 'dark'}
              onChange={handlePostThemeChange}
            />
          </Box>
        </Box>

        <CardContent>
          {' '}
          {blogLoading ? (
            <LinearProgress />
          ) : (
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{
                __html: purifyDOMContent(blogContent),
              }}
            />
          )}
        </CardContent>
        <CardActions>
          <Typography>
            Published On: {new Date(createdAt).toDateString()}
          </Typography>
        </CardActions>
      </Card>
    </ThemeProvider>
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
