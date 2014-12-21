var _              = require('underscore'),
    Backbone       = require('backbone'),
    ProcessManager = require('./processManager.js');

/**
 * a single session of a single user
 **/
var _Session = Backbone.Model.extend({
    defaults: {
        sid        : null,
        display    : null,
        procManager: ProcessManager.emptyProcessManager()
    }
});
exports.Session = _Session;
