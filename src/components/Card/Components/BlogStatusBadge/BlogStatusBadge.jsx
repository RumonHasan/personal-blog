import { Container, Typography } from '@mui/material';
import './BlogStatusBadgeStyles.css';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const BlogStatusBadge = (props) => {
  const { blogStatus } = props;
  const [badgeClass, setBadgeClass] = useState({});

  useEffect(() => {
    switch (blogStatus) {
      case 'completed':
        setBadgeClass({
          badgeName: 'Completed',
          class: 'completed-badge',
        });
        break;
      case 'inprogress':
        setBadgeClass({
          badgeName: 'In Progress',
          class: 'incomplete-badge',
        });
        break;
      default:
        break;
    }
  }, [blogStatus]);

  return (
    <Container className={badgeClass.class}>
      <Typography>{badgeClass.badgeName}</Typography>
    </Container>
  );
};

BlogStatusBadge.propTypes = {
  blogStatus: PropTypes.any,
};

export default BlogStatusBadge;
