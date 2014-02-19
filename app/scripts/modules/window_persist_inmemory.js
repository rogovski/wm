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

        removeItem: function (arr,item) {

            var index = arr.indexOf(item);

            if (index > -1) {
                arr.splice(index, 1);
            }            
        }, 
        /**********************************************************************
        /* WINDOWS
        /*********************************************************************/
        create_window: function (self, evt, args) {
            if( _.isUndefined(args.data) ) return;

            var obj = wmJs.Data.WindowedApplicationInstance.create(
                        wmJs.Util.tryTile(self._db.windows,args.data));
            
            self._db.windows.push( obj );
            $.publish(wmJs.Data.Topics.appInstancePersistCreated,
                        {result: wmJs.Util.cloneInstance(obj)});
        },

        set_window: function (self, evt, args) {
            if( _.isUndefined(args.id) || _.isUndefined(args.values) ) return;

            var item = _.findWhere( self._db.windows, { id: args.id } );
            _.extend(item.values, args.values, {});   
        },

        get_window: function (id) {
            var item = _.findWhere( this._db.windows, { id: id } );
            console.log(item);  
            return 'get_window';           
        },

        get_all_windows: function (self, evt, args) {
            $.publish(wmJs.Data.Topics.applicationInstancesResponse, 
                      {result: wmJs.Util.cloneInstanceList(self._db.windows), replyFor: args.replyTo});
        },

        remove_window: function (self,evt,args) {
            if( _.isUndefined(args) || _.isUndefined(args.id) ) return;
            var item = _.findWhere( self._db.windows, { id: args.id } );
            self._db.windows = _.without(self._db.windows, item);

            console.log(self._db.windows);
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