(function () {
    'use strict';

    wmJs.InMemoryPersist = wmJs.PersistentBackend.extend({

        _db: {
            windows: [],
            workspaces: [],
        },

        initialize: function (options) {
            console.log('init');
        },

        set_window: function (id, data) {
            console.log('set');
        },

        get_window: function () {
            console.log('get');
        },

        remove_window: function () {
            console.log('remove');
        },

        set_workspace: function (id, data) {
            console.log('set');
        },

        get_workspace: function () {
            console.log('get');
        },

        remove_workspace: function () {
            console.log('remove');
        }

    }); 

})();