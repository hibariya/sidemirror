// To use it create some files under `mocks/`
// e.g. `server/mocks/ember-hamsters.js`
//
// module.exports = function(app) {
//   app.get('/ember-hamsters', function(req, res) {
//     res.send('hello');
//   });
// };

module.exports = function(app, options) {
  var globSync   = require('glob').sync;
  var mocks      = globSync('./mocks/**/*.js', { cwd: __dirname }).map(require);
  var proxies    = globSync('./proxies/**/*.js', { cwd: __dirname }).map(require);

  // Log proxy requests
  var morgan  = require('morgan');
  app.use(morgan('dev'));

  mocks.forEach(function(route) { route(app); });
  proxies.forEach(function(route) { route(app); });

  // handle websocket events
  var io = require('socket.io')(options.httpServer);

  io.on('connection', function(socket) {
    socket.on('message', function(data) {
      var recipient = data.recipient;

      if (recipient) {
        io.to(recipient).emit('message', data);
      } else {
        socket.broadcast.emit('message', data);
      }
    });
  });
};
