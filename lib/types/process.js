var _        = require('underscore'),
    Backbone = require('backbone');

/**
 * a process of a session
 **/
var _Process = Backbone.Model.extend({
    defaults: {
        pid        : null,
        display    : null,
        program    : null,
        handle     : null
    }
});
exports.Process = _Process;
