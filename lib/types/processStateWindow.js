var _           = require('underscore'),
    Backbone    = require('backbone');

/**
 * a process of a session
 **/
var _ProcessStateWindow = Backbone.Model.extend({
    defaults: {
        hasWindowState: false,
        left          : null,
        top           : null,
        height        : null,
        width         : null
    }
});
exports.ProcessStateWindow = _ProcessStateWindow;
