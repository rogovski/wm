var _ = require('underscore'),
    $ = require('jquery');

var sessions = ['sess1'];

function _loadSessionManager(options) {
    setTimeout(function () {
        options.success(sessions);
    }, 1000);
}
exports.loadSessionManager = _loadSessionManager;