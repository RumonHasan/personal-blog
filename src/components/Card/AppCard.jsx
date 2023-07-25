import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Box,
  Typography,
  CardHeader,
} from '@mui/material';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './AppCardStyles.css';
import BlogStatusBadge from './Components/BlogStatusBadge/BlogStatusBadge';
import { useSelector } from 'react-redux';

const AppCard = (props) => {
  const {
    id,
    coverImage,
    slug,
    title,
    description,
    createdAt,
    updatedAt,
    categories,
    blogStatus,
  } = props;
  const latestBlogPostId = useSelector((data) => data.mainReducer.latestPostId);
  return (
    <Card
      sx={{ maxWidth: 700 }}
      className={
        id === latestBlogPostId ? 'latest-post-card-container' : undefined
      }
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <CardHeader
          title={title}
          subheader={
            <Typography>{new Date(createdAt).toDateString()}</Typography>
          }
        />
        <Box>
          <BlogStatusBadge blogStatus={blogStatus} />
        </Box>
      </Box>

      <Link to={`/article/${slug}`}>
        <Box className="zoom-img">
          <CardMedia
            component="img"
            alt={title}
            height="300"
            image={coverImage.url}
          />
        </Box>
      </Link>
      <CardContent>
        <Card className="description-card">
          <div style={{ overflow: 'auto', height: '100%' }}>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </div>
        </Card>
        {/* {id === latestBlogPostId && <span className="latest-label">New</span>} */}
      </CardContent>
      <CardActions className="card-actions">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width={'100%'}
        >
          <Box>
            {categories.map((category) => {
              return (
                <Link to={`/blogPosts/${category.slug}`} key={category.id}>
                  <Button>{category.name}</Button>
                </Link>
              );
            })}
          </Box>

          <Typography className="updated-text">
            Updated:{new Date(updatedAt).toDateString()}
          </Typography>
        </Box>
      </CardActions>
    </Card>
  );
};

AppCard.propTypes = {
  coverImage: PropTypes.any,
  slug: PropTypes.any,
  id: PropTypes.any,
  title: PropTypes.any,
  content: PropTypes.any,
  description: PropTypes.any,
  createdAt: PropTypes.any,
  updatedAt: PropTypes.any,
  categories: PropTypes.any,
  blogStatus: PropTypes.any,
};

export default AppCard;
