var _        = require('underscore'),
    Backbone = require('backbone'),
    Process  = require('./process.js');

/**
 * all processes of a single session
 **/
var _ProcessCollection = Backbone.Collection.extend({
    model: Process.Process
});
exports.ProcessCollection = _ProcessCollection;