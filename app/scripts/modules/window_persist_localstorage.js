(function () {
    'use strict';
    
  wmJs.Persistence.LocalStoragePersist = wmJs.Persistence.PersistentBackend.extend({

        _cache: {
            appInstances:[],
            workspaces:[],
            applications:[],
            appInstIdPool:[],
            appIdPool:[],
            workspaceIdPool:[]
        },

        initialize: function () {
            this._cache.appInstIdPool = store.get('appInstIdPool') || {};
            this._cache.workspaceIdPool = store.get('workspaceIdPool') || {};
            this._cache.appIdPool = store.get('appIdPool') || {};

            var self = this;
            _.each(this._cache.appInstIdPool, function (e) {
                self._cache.appInstances.push({id: e, values: store.get(e)});
            });

            _.each(this._cache.workspaceIdPool, function (e) {
                self._cache.workspaces.push({id: e, values: store.get(e)});
            });

            _.each(this._cache.appIdPool, function (e) {
                self._cache.applications.push({id: e, values: store.get(e)});
            });
        },

        /**********************************************************************
        /* appInstances
        /*********************************************************************/
        create_window: function (self, evt, args) {
            if( _.isUndefined(args.data) ) return;

            var obj = wmJs.Data.WindowedApplicationInstance.create(
                        wmJs.Util.tryTile(self._cache.appInstances,args.data));
            
            self._cache.appInstances.push( obj );
            $.publish(wmJs.Data.Topics.appInstancePersistCreated,
                        {result: obj});
        },

        set_window: function (self, evt, args) {
            if( _.isUndefined(args.id) || _.isUndefined(args.values) ) return;

            var item = _.findWhere( self._cache.appInstances, { id: args.id } );
            _.extend(item.values, args.values, {});   

            store.set(item.id, item.values);

        },

        get_window: function (id) {
            var item = _.findWhere( this._cache.appInstances, { id: id } );
            console.log(item);  
            return 'get_window';           
        },

        get_all_windows: function (self, evt, args) {
            $.publish(wmJs.Data.Topics.applicationInstancesResponse, 
                      {result: wmJs.Util.cloneInstanceList(self._cache.appInstances), replyFor: args.replyTo});
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
                      {result: self._cache.workspaces, replyFor: args.replyTo});                
        },

        remove_workspace: function () {
            console.log('remove');
        },


        /**********************************************************************
        /* APPLICATIONS
        /*********************************************************************/        
        get_all_applications: function (self, evt, args) {
            $.publish(wmJs.Data.Topics.applicationsResponse, 
                      {result: self._cache.applications, replyFor: args.replyTo});   
        }
  }); 

})();