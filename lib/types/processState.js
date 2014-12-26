var _           = require('underscore'),
    Backbone    = require('backbone'),
    WindowState = require('./processStateWindow.js');

/**
 * a process of a session
 **/
var _ProcessState = Backbone.Model.extend({
    defaults: {
        status     : null,
        windowState: null
    }
});
exports.ProcessState = _ProcessState;
