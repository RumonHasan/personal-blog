import './CommentStyles.css';
import { Card, CardHeader, CardContent, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { randomColorCodeGenerator } from '../../utils/general';

export const Comment = (props) => {
  const { author, content } = props;
  const randomColor = randomColorCodeGenerator();
  return (
    <Card
      sx={{
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
        borderRadius: '8px',
        padding: '16px',
      }}
    >
      From:
      <CardHeader
        title={
          <Typography variant="h6" sx={{ color: `#${randomColor}` }}>
            {author}
          </Typography>
        }
      />
      <CardContent>
        <Typography variant="body1">{content}</Typography>
      </CardContent>
    </Card>
  );
};

Comment.propTypes = {
  author: PropTypes.any,
  content: PropTypes.any,
};

export default Comment;
