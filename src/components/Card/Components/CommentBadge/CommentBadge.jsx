import PropTypes from 'prop-types';
import './CommentBadgeStyles.css';
import CommentIcon from '@mui/icons-material/Comment';
import { Badge } from '@mui/material';

const CommentBadge = ({ commentCount }) => {
  return (
    <div className="comment-badge-container">
      <Badge badgeContent={commentCount} color="primary">
        <CommentIcon />
      </Badge>
    </div>
  );
};

CommentBadge.propTypes = {
  commentCount: PropTypes.any,
};

export default CommentBadge;
