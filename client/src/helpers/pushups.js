import EventEmitter from './EventEmitter';
import { useEffect, useState } from 'react';
import { green, red, orange, blue } from '@material-ui/core/colors';
import {
  CheckCircleOutlined,
  ErrorOutline,
  InfoOutlined,
  ReportProblemOutlined,
} from '@material-ui/icons';

const SUCCESS = 'success';
const ERROR = 'error';
const WARNING = 'warning';
const INFO = 'info';

const ADD = 'message_add';
const SHAKE = 'message_shake';

const colors = {
  [SUCCESS]: green[500],
  [ERROR]: red[500],
  [WARNING]: orange[500],
  [INFO]: blue[500],
};

const icons = {
  [SUCCESS]: CheckCircleOutlined,
  [ERROR]: ErrorOutline,
  [WARNING]: ReportProblemOutlined,
  [INFO]: InfoOutlined,
};

const emitter = new EventEmitter();
let globalMessages = [];

function usePushUp() {
  const [, setMessages] = useState([]);
  const setGlobalMessages = messages => {
    globalMessages = messages;

    setMessages(messages);
  };

  useEffect(() => {
    const addMessage = message => setGlobalMessages([...globalMessages, message]);

    emitter.addListener(ADD, addMessage);

    return () => emitter.removeListener(ADD, addMessage);
  }, []);

  return [globalMessages, setGlobalMessages];
}

function useShake(id, shakeTimeout = 1000) {
  const [shake, setShake] = useState(false);

  useEffect(() => {
    const shakeMessage = message => {
      if (message.id === id) {
        setShake(true);

        setTimeout(() => setShake(false), shakeTimeout);
      }
    };

    emitter.addListener(SHAKE, shakeMessage);

    return () => emitter.removeListener(SHAKE, shakeMessage);
  }, []);

  return [shake, setShake];
}

function showWarning(text) {
  showMessage(text, WARNING);
}

function showInfo(text) {
  showMessage(text, INFO);
}

function showSuccess(text) {
  showMessage(text, SUCCESS);
}

function showError(text) {
  showMessage(text, ERROR);
}

function showMessage(text, type = INFO) {
  const id = Date.now() * Math.random();
  const message = globalMessages.find(msg => msg.text === text);

  if (message) {
    emitter.emit(SHAKE, message);
  } else {
    emitter.emit(ADD, { text, color: colors[type], id, icon: icons[type] });
  }
}

export { showError, showInfo, showWarning, showSuccess, usePushUp, useShake };
