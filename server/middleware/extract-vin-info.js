let app = require('../server');
const loopBackContext = require('loopback-context');

module.exports = function() {
  return function(req, res, next) {
    const userModel = app.models.User;
    req.userId = req.headers.user_id;
    req.deviceId = req.headers.device_id;
    req.scannerVersion = req.headers.scanner_version;
    req.timestamp = req.headers.timestamp;
    req.session = req.headers.session;
    next();
  };
};
