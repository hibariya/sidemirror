export function initialize(container, application) {
  application.inject('route',      'socket', 'service:socket');
  application.inject('model',      'socket', 'service:socket');
  application.inject('controller', 'socket', 'service:socket');
  application.inject('component',  'socket', 'service:socket');
}

export default {
  name: 'socket-service',
  initialize: initialize
};
