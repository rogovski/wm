(function () {
    'use strict';

    wmJs.Persistence.InMemoryPersist = wmJs.Persistence.PersistentBackend.extend({

        _db: {
            windows: [],
            workspaces: [],
        },

        initialize: function (options) {
            // TODO: error checks
            this._db.windows = options.windows;
            this._db.workspaces = options.workspaces;

            console.log('init');
        },

        create_window: function (data) {
            var obj = wmJs.Data.WindowedApplicationInstance.create(data);
            this._db.windows.push( { key: obj.id, value: obj } );
            return    
        },

        set_window: function (id, data) {
            var item = _.findWhere( this._db.windows, { key: id } );
            console.log(item);         
        },

        get_window: function (id) {
            var item = _.findWhere( this._db.windows, { key: id } );
            console.log(item);             
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