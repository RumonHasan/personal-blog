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

const AppCard = (props) => {
  const {
    coverImage,
    slug,
    id,
    title,
    content,
    description,
    createdAt,
    updatedAt,
    categories,
  } = props;
  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardHeader
        title={title}
        subheader={
          <Typography>{new Date(createdAt).toDateString()}</Typography>
        }
      />
      <Link to={`/article/${slug}`}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="300"
          image={coverImage.url}
        />
      </Link>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          {categories.map((category) => {
            return (
              <Link to={`/blogPosts/${category.slug}`} key={category.id}>
                <Button>{category.name}</Button>
              </Link>
            );
          })}
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
};

export default AppCard;
