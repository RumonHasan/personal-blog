import './CommentStyles.css';
import { Card, CardHeader, CardContent, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { colors } from '../../services/Themes/Colors';

export const Comment = (props) => {
  const { author, content } = props;

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
          <Typography variant="h6" sx={{ color: colors.MAIN_BLUE }}>
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
