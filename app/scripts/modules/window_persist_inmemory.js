(function () {
    'use strict';

    wmJs.Persistence.InMemoryPersist = wmJs.Persistence.PersistentBackend.extend({

        _db: {
            windows: [],
            workspaces: [],
            applications: []
        },

        initialize: function (options) {
            // TODO: error checks
            this._db.windows = options.windows || {};
            this._db.workspaces = options.workspaces || {};
            this._db.applications = options.applications || {};
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

        get_all_windows: function (self, evt, args) {
            $.publish(wmJs.Data.Topics.applicationInstancesResponse, 
                      {result: self._db.windows, replyFor: args.replyTo});     
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

        get_all_workspaces: function (self, evt, args) {
            $.publish(wmJs.Data.Topics.workspacesResponse, 
                      {result: self._db.workspaces, replyFor: args.replyTo});                
        },

        remove_workspace: function () {
            console.log('remove');
        },


        /**********************************************************************
        /* APPLICATIONS
        /*********************************************************************/        
        get_all_applications: function (self, evt, args) {
            $.publish(wmJs.Data.Topics.applicationsResponse, 
                      {result: self._db.applications, replyFor: args.replyTo});   
        }
    }); 

})();