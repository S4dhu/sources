const styles = theme => ({
  pushups: {
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    top: theme.spacing(4),
    left: '50%',
    transform: 'translate(-50%)',
    zIndex: '1300',
    padding: theme.spacing(2.5),
    '& > div': {
      margin: theme.spacing(0.625),
      position: 'relative',
    },
  },
});

export default styles;
