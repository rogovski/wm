var _        = require('underscore'),
    Backbone = require('backbone'),
    ProcessCollection = require('./processCollection.js');

/**
 * a list of processes
 **/
var _ProcessManager = Backbone.Model.extend({
    defaults: {
        processes  : new ProcessCollection.ProcessCollection(),
        sid        : null
    }
});
exports.ProcessManager = _ProcessManager;


function _emptyProcessManager() {
    return new _ProcessManager();
}
exports.emptyProcessManager = _emptyProcessManager;