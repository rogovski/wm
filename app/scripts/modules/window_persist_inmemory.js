(function () {
    'use strict';

    wmJs.Persistence.InMemoryPersist = wmJs.Persistence.PersistentBackend.extend({

        _db: {
            windows: [],
            workspaces: [],
        },

        initialize: function (options) {
            console.log('init');
        },

        set_window: function (workspaceId, appId, instanceId, data) {
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