import './CommentStyles.css';
import { Card, CardHeader, CardContent, Typography } from '@mui/material';
import PropTypes from 'prop-types';

export const Comment = (props) => {
  const { author, content } = props;
  return (
    <Card>
      <CardHeader title={author} />
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
