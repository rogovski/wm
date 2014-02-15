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
            if(!store.enabled){
                alert('LOCAL STORAGE IS NOT ENABLED');
                throw new Error('LOCAL STORAGE IS NOT ENABLED');
            }
            
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
            console.log(this._cache.appInstances);
        },

        getUniqueId: function (prefix) {
            var pool;
            if      (prefix == 'appInst')   { pool = this._cache.appInstIdPool.slice(0); }
            else if (prefix == 'app')       { pool = this._cache.appIdPool.slice(0); }
            else if (prefix == 'workspace') { pool = this._cache.workspaceIdPool.slice(0); }
            else                            { }

            if(!pool) return pool;

            pool = _.map(pool, function (e) {
                return parseInt(e.split('_')[1]);
            });
            return prefix + '_' + (_.max(pool) + 1);
        },

        /**********************************************************************
        /* appInstances
        /*********************************************************************/
        create_window: function (self, evt, args) {
            if( _.isUndefined(args.data) ) return;

            var obj = wmJs.Data.WindowedApplicationInstance.create(
                        wmJs.Util.tryTile(self._cache.appInstances,args.data));
            obj.id = self.getUniqueId('appInst');

            self._cache.appInstances.push( obj );
            self._cache.appInstIdPool.push( obj.id );

            var idPool = store.get('appInstIdPool');
            idPool.push(obj.id);

            store.set('appInstIdPool', idPool);
            store.set(obj.id, obj.values);

            $.publish(wmJs.Data.Topics.appInstancePersistCreated,
                        {result: wmJs.Util.cloneInstance(obj)});
        },

        set_window: function (self, evt, args) {
            if( _.isUndefined(args.id) || _.isUndefined(args.values) ) return;

            var item = _.findWhere( self._cache.appInstances, { id: args.id } );
            _.extend(item.values, args.values, {});   

            var idPool = store.get('appInstIdPool');
            
            store.set('appInstIdPool', idPool);
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

        remove_window: function (self,evt,args) {
            if( _.isUndefined(args) || _.isUndefined(args.id) ) return;

            var idPool = _.without(store.get('appInstIdPool'), args.id);

            console.log(idPool);

            store.remove(args.id);
            store.set('appInstIdPool',idPool);

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
            if(_.isUndefined(args) || _.isUndefined(args.replyTo)) return;

            if(!_.isUndefined(args.applications)) {

                var factoryKeyApps = _.map(self._cache.applications, function (e) { 
                        return _.pick(e,'values').values.factoryKey; 
                    }),

                    factoryKeysArgs = _.map(args.applications, function (e) { 
                        return e.factoryKey; 
                    });
                
                /******************************************************************//*
                _.each(_.difference(factoryKeyApps, factoryKeysArgs), function (e) {
                    var newObj = _.findWhere(args.applications, {factoryKey: e}),
                        newId  = self.getUniqueId('app');
                        
                        self._cache.applications.push({ id: newId, values: newObj });
                        self._cache.appIdPool.push(newId);

                        store.set(newId, newObj);
                        store.set('appIdPool', self._cache.appIdPool);
                });
                *//*******************************************************************/
            }

            $.publish(wmJs.Data.Topics.applicationsResponse, 
                      {result: self._cache.applications, replyFor: args.replyTo});   
        }
  }); 

})();