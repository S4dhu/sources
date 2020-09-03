import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  cross: {
    padding: theme.spacing(0.5),
    color: 'white',
  },
}));

function Cross({ onClick }) {
  const classes = useStyles();

  return (
    <IconButton key="close" aria-label="Close" className={classes.cross} onClick={onClick}>
      <CloseIcon />
    </IconButton>
  );
}

Cross.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Cross;