import { Snackbar } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';

const AppSnackbar = (props) => {
  const { hideDuration, message } = props;
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={hideDuration}
      onClose={handleClose}
      message={message}
    />
  );
};

AppSnackbar.propTypes = {
  hideDuration: PropTypes.any,
  message: PropTypes.any,
};
export default AppSnackbar;
