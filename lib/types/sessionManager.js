var _        = require('underscore'),
    Backbone = require('backbone');

/**
 * backbone model that stores session information,
 * one instance per page load. this object is a proxy to
 * to some centralized data store. all users/sessions
 * could be accessed through it if a caller has the right credentials
 */
var _SessionManager = Backbone.Model.extend({


    defaults: {
        managerInfo: null
    },

    backend: null

});
exports.SessionManager = _SessionManager;