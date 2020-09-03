export default class EventEmitter {
  eventListeners = {};

  addListener = (event, listener) => {
    if (typeof listener !== 'function') return;

    const listeners = this.eventListeners[event] || [];

    this.eventListeners[event] = [...listeners, listener];
  };

  removeListener = (event, listener) => {
    const listeners = this.eventListeners[event];

    if (listeners) {
      this.eventListeners[event] = listeners.filter(l => l !== listener);
    }
  };

  emit = (event, ...data) => {
    this.eventListeners[event] && this.eventListeners[event].forEach(l => l(...data));
  };
}
