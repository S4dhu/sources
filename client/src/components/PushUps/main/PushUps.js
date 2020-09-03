import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { usePushUp } from 'helpers/pushups';
import PushUp from './PushUp';
import Cross from './Cross';
import styles from './PushUps.style';

const useStyles = makeStyles(styles);

function PushUps() {
  const classes = useStyles();
  const [messages, setMessages] = usePushUp();

  const removeMessage = message => {
    setMessages(messages.filter(m => m !== message));
  };

  return (
    <div className={classes.pushups}>
      {messages.map(message => {
        const remove = <Cross onClick={() => removeMessage(message)} />;

        return (
          <PushUp
            key={message.id}
            id={message.id}
            icon={message.icon}
            text={message.text}
            color={message.color}
            action={remove}
          />
        );
      })}
    </div>
  );
}

export default PushUps;
