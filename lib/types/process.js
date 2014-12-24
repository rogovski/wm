var _            = require('underscore'),
    Backbone     = require('backbone'),
    ProcessState = require('./processState.js');

/**
 * a process of a session
 **/
var _Process = Backbone.Model.extend({
    defaults: {
        pid        : null,
        parentPid  : null,
        sid        : null,
        display    : null,
        program    : null,
        handle     : null,
        state      : new ProcessState.ProcessState()
    }
});
exports.Process = _Process;
