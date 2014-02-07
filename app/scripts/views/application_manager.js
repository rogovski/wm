/*global wmJs, Backbone, JST*/

wmJs.Views = wmJs.Views || {};


(function () {
    'use strict';

    wmJs.Views.ApplicationManagerView = Backbone.View.extend({

        currentWorkspace: null,

        template: JST['app/scripts/templates/application_manager.ejs'],

        registerSubscriptions: function () {
            $.subscribe(WM.topics.viewInitialized, 
                        _.partial(this.workspaceInit,this));

            $.subscribe(WM.topics.workspaceLoaded,
                        _.partial(this.windowsInit,this));

            $.subscribe(WM.topics.workspaceWindowsLoaded, 
                        _.partial(this.viewReady, this));

            $.subscribe(WM.topics.windowConfigRequest, 
                        _.partial(this.handleWmDataRequest, this));
        },

       /**
        * using appDataSource get list of WindowedApplication
        *          this.WindowedApplications <- list of WindowedApplication
        *
        * using appDataSource get list of Workspace
        *          this.Workspaces <- list of Workspace
        *
        * using this.Workspaces get default workspace
        *          this.CurrentWorkspace <- default workspace
        *
        * using appDataSource get all app instances, 
        *       group all instance by workspace,
        *       foreach workspace, group by appId
        *       cache them in memory
        *          this.appInstances <- all app instances (with grouping)
        *
        * using this.WindowedApplications register all applications with appFactory
        *
        * filter this.appInstances by this.CurrentWorkspace
        *        var currentIntances <- filtered
        *        foreach el in currentInstances
        *            
        */   
        initialize2: function (config) {
            config || WM.Exception.ConfigPropertyMissing('initialize');

            if(typeof(config.appDataSource) == 'undefined') {
                // TODO: throw more descriptive exception
                throw new Error('init2 appDataSource');
            }

            if(typeof(config.appFactory) == 'undefined') {
                // TODO: throw more descriptive exception
                throw new Error('init2 appFactory');
            }                    
        },

        /*
         * ApplicationManagerView gets initialized with the following:
         * WorkspaceConfig -height and width of #app
         * WindowFactory -module for creating windows based off of key
         * WindowConfigList -list of window properties, important
         *                   that each objecy contains the factory key
         *                   to be used by WindowFactory 
         */
        initialize: function (config) {
        	config || WM.Exception.ConfigPropertyMissing('initialize');

            /**
             * WorkspaceConfig is one of the follwing:
             * - an in memory object that gives a single configuration
             * - a function that takes a workspace id and returns an
             *   an element of an in memory list of workspace objects
             * - an ajax get request that takes a workspace id an
             *   returns a single configuration object from a provided url
             */
            this.WorkspaceConfig = 
                config.WorkspaceConfig ||
                WM.Exception.ConfigPropertyMissing('WorkspaceConfig');

            /**
             * Window factory is a function that constructs a window
             * when given a lookup key and initialization arguments
             */
            this.WindowFactory = 
                config.WindowFactory ||
                WM.Exception.ConfigPropertyMissing('WindowFactory');

            /**
             * WindowTypes is a function that returns the display name
             * and factoryKey of all types registered in the factory
             */
            this.WindowTypes = 
                config.WindowTypes ||
                WM.Exception.ConfigPropertyMissing('WindowTypes');

            /**
             * WindowConfigList is one of the follwing:
             * - an in memory list of window configuration objects
             * - a function that takes a workspace id and returns an
             *   an element of an in memory list of workspace objects
             * - an ajax get request that takes a workspace id and 
             *   returns a list of window configuration objects from 
             *   a provided url
             */
            this.WindowConfigList = 
                config.WindowConfigList ||
                WM.Exception.ConfigPropertyMissing('WindowConfigList');

            /**
             * id of the current workspace, needed only for ajax
             * calls and generator functions
             */
            this.currentWorkspace = 
                this.WorkspaceConfig.id ||
                null;

            /*
             * register ApplicationManagerView's subscriptions
             */
            this.registerSubscriptions();
        },

        render: function () {
            $.publish(WM.topics.viewInitialized);
        },

        /**
         * first step in the pipeline. get workspace info
         */
        workspaceInit: function (self,evt,args) {
            /**
             * workspace configuration is an in-memory object
             */
            if(typeof(self.WorkspaceConfig.url) == 'undefined'){                   
                $.publish(WM.topics.workspaceLoaded);
                return;
            }

            /**
             * workspace configuration is a function that looks up
             * an in memory object
             */
            var wsObj = self.WorkspaceConfig.url(self.currentWorkspace);
            if(wsObj instanceof Object){
                self.WorkspaceConfig.data = wsObj;
                $.publish(WM.topics.workspaceLoaded);
                return;
            }

            /**
             * workspace configuration is a server side object
             */            
            $.when($.ajax({ 
                url: self.WorkspaceConfig.url(
                        self.currentWorkspace)})).then(
               /**
                * if successful set WorkspaceConfig.data
                * then trigger the next phase of view
                * initialization
                */                    
                function (res) {
                    self.WorkspaceConfig.data = res;
                    $.publish(WM.topics.workspaceLoaded); 
                },

               /**
                * TODO: figure out error cases
                */
                function (res) {
                    console.log(res);
                });           
        },

        /**
         * second step in the pipeline. get window info in workspace
         */
        windowsInit: function (self,evt,args) {
            /**
             * window configuration list was an in-memory object
             */
            if(typeof(self.WindowConfigList.url) == 'undefined'){                    
                $.publish(WM.topics.workspaceWindowsLoaded);
                return;
            }

            /**
             * window configuration list is a function that looks up
             * an in memory object
             */
            var winLsObj = self.WindowConfigList.url(self.currentWorkspace);
            if(winLsObj instanceof Object){
                self.WindowConfigList.data = winLsObj;
                $.publish(WM.topics.workspaceWindowsLoaded);
                return;
            }

            /**
             * window configuration list is a server side object
             */ 
            $.when($.ajax({ 
                url: self.WindowConfigList.url(
                        self.currentWorkspace)})).then(
               /**
                * if successful set WorkspaceConfig.data
                * then trigger the next phase of view
                * initialization
                */                    
                function (res) {
                    self.WindowConfigList.data = res;
                    $.publish(WM.topics.workspaceWindowsLoaded); 
                },

               /**
                * TODO: figure out error cases
                */
                function (res) {
                    console.log(res);
                });           
        },

        /**
         * third step in the pipeline. initialize all windows and 
         * slice in templates
         */
        viewReady: function (self,evt,args) {
            self.applyWorkspaceConfiguration();
            self.$el.html('');
            self.WindowConfigList.data.forEach(function (e,i) {
                e.instance = self.WindowFactory(e.factoryKey, {
                    parentView: self.el,
                    config: e
                });
                self.$el.append(e.instance.el);
                e.instance.render({resetTemplate: true});
            });
            
        }, 

        /**
         * handles requests for configuration data 
         * @args {object}
         * @args.publishTo {string} -contains topic to publish to after processing is complete
         * @args.resource {string}  -key of requested resource
         * @args.transform {function} -transformation to apply to reasource before returning to sender 
         */
        handleWmDataRequest: function (self,evt,args) {
            var options = args || {};

            if(options.publishTo && options.resource){
                var res = self[options.resource] || null;

                $.publish(options.publishTo, 
                    options.transform && _.isFunction(options.transform) 
                        ? options.transform(res) : res);
            }
        },

        applyWorkspaceConfiguration: function () {
            this.$el.css('width', this.WorkspaceConfig.data.width)
                    .css('height', this.WorkspaceConfig.data.height);
        }

    });

})();
