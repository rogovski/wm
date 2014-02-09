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

        /**********************************************************************
        /* WINDOWS
        /*********************************************************************/
        create_window: function (data) {
            var obj = wmJs.Data.WindowedApplicationInstance.create(data);
            this._db.windows.push( { key: obj.id, value: obj } );
        },

        set_window: function (id, data) {
            var item = _.findWhere( this._db.windows, { id: id } );
            _.extend(item.values, data, {});    
        },

        get_window: function (id) {
            var item = _.findWhere( this._db.windows, { id: id } );
            console.log(item);  
            return 'get_window';           
        },

        get_all_windows: function () {
            console.log(this._db.windows);  
            return 'get_window';           
        },

        remove_window: function () {
            console.log('remove');
        },


        /**********************************************************************
        /* WORKSPACES
        /*********************************************************************/
        set_workspace: function (id, data) {
            console.log('set');
        },

        get_workspace: function () {
            console.log('get');
        },

        remove_workspace: function () {
            console.log('remove');
        }


        /**********************************************************************
        /* APPLICATIONS
        /*********************************************************************/        

    }); 

})();