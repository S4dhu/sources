import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Snackbar, SnackbarContent } from '@material-ui/core';
import classNames from 'classnames';
import Message from './Message';
import { useShake } from 'helpers/pushups';

const useStyles = makeStyles(() => ({
  root: ({ color }) => ({
    backgroundColor: color,
    flexWrap: 'nowrap',
  }),

  '@keyframes shake': {
    '10%': {
      transform: 'rotate(1deg)',
    },
    '20%': {
      transform: 'rotate(-1deg) translate(-2px, 0)',
    },
    '30%': {
      transform: 'rotate(2deg) translate(3px, 0)',
    },
    '40%': {
      transform: 'rotate(-3deg) translate(-5px, 0)',
    },
    '50%': {
      transform: 'rotate(2deg) translate(4px, 0)',
    },
    '60%': {
      transform: 'rotate(-1deg)  translate(-3px, 0)',
    },
    '70%': {
      transform: 'rotate(0.5deg) translate(1px, 0)',
    },
  },

  shake: {
    animation: '$shake 0.6s cubic-bezier(.36,.07,.19,.97) both',
  },
}));

function PushUp(props) {
  const { icon, text, color, action, id } = props;
  const classes = useStyles(props);
  const [shake] = useShake(id, 650);

  return (
    <Snackbar open className={'pushup'} color={color} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <SnackbarContent
        className={classNames(classes.root, { [classes.shake]: shake })}
        message={<Message Icon={icon} text={text} />}
        action={action}
      />
    </Snackbar>
  );
}

PushUp.propTypes = {
  id: PropTypes.number.isRequired,
  icon: PropTypes.instanceOf(Object),
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  action: PropTypes.instanceOf(Object).isRequired,
};

PushUp.defaultProps = {
  icon: null,
};

export default PushUp;
