import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  icon: {
    display: 'flex',
    marginRight: theme.spacing(1.5),
  },
  message: {
    fontWeight: 550,
    flexWrap: 'nowrap',
  },
}));

function Message({ Icon, text }) {
  const classes = useStyles();

  return (
    <Grid className={classes.message} container direction="row" justify="center" alignItems="center">
      <Grid item className={classes.icon}>
        <Icon />
      </Grid>
      <Grid item>{text}</Grid>
    </Grid>
  );
}

Message.propTypes = {
  Icon: PropTypes.instanceOf(Object).isRequired,
  text: PropTypes.string.isRequired,
};

export default Message;
