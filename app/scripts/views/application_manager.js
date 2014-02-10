/*global wmJs, Backbone, JST*/

wmJs.Views = wmJs.Views || {};


(function () {
    'use strict';

    wmJs.Views.ApplicationManagerView = Backbone.View.extend({

        applications: null,

        currentWorkspace: null,

        workspaces: null,

        instances: null,

        template: JST['app/scripts/templates/application_manager.ejs'],

        registerSubscriptions: function () {
            /*$.subscribe(WM.topics.viewInitialized,
                        _.partial(this.workspaceInit,this));

            $.subscribe(WM.topics.workspaceLoaded,
                        _.partial(this.windowsInit,this));

            $.subscribe(WM.topics.workspaceWindowsLoaded,
                        _.partial(this.viewReady, this));

            $.subscribe(WM.topics.windowConfigRequest,
                        _.partial(this.handleWmDataRequest, this));
*/

            $.subscribe(wmJs.Data.Topics.applicationsResponse,
                         _.partial(this.applicationsInit,this));

            $.subscribe(wmJs.Data.Topics.workspacesResponse,
                         _.partial(this.workspacesInit,this));

            $.subscribe(wmJs.Data.Topics.applicationInstancesResponse,
                         _.partial(this.appInstancesInit,this));

            $.subscribe(wmJs.Data.Topics.currentWorkspaceRequest,
                         _.partial(this.publishCurrentWorkspace,this));

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

        /*
         * ApplicationManagerView gets initialized with the following:
         * WorkspaceConfig -height and width of #app
         * WindowFactory -module for creating windows based off of key
         * WindowConfigList -list of window properties, important
         *                   that each objecy contains the factory key
         *                   to be used by WindowFactory 
         */
        initialize: function (config) {
        	config                 || 
                wmJs.Exception.ConfigPropertyMissing('initialize');

            config.appDataSource   || 
                wmJs.Exception.ConfigPropertyMissing('initialize:appDataSource');

            config.appFactory      ||
                wmJs.Exception.ConfigPropertyMissing('initialize:appFactory');

            config.appMessages     ||
                wmJs.Exception.ConfigPropertyMissing('initialize:appMessages'); 


            /**
             * appDataSource is meant to be one of the follwing:
             * - an in memory store
             * - an interface to the browsers local storage
             * - an interface to ajax calls to a backend server
             * ------------------------------------------------------
             * all of the out-of-the-box behaviors implement the interface
             * described by AbstractPersistentBackend, all custom stoage schemes
             * should do the same. all methods in AbstractPersistentBackend return
             * values via $.publish(...), so be sure to subscribe to the proper
             * topics.
             */

            this.registerSubscriptions();

            return;
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
            $.publish(wmJs.Data.Topics.workspacesRequest, {replyTo: this.cid});            
        },

        /**
         * handle response from persistence layer for all workspaces
         */
        workspacesInit: function (self,evt,args) {
            if(_.isUndefined(args.replyFor) || args.replyFor != self.cid) return;

            self.workspaces       = args.result;
            self.currentWorkspace = _.filter(self.workspaces, function (obj) {
                return obj.values.isDefault === true;
            })[0];

            $.publish(wmJs.Data.Topics.applicationsRequest, {replyTo: self.cid});
        },

        /**
         * handle response from persistence layer for all applications
         */
        applicationsInit: function (self,evt,args) {
            if(_.isUndefined(args.replyFor) || args.replyFor != self.cid) return;

            self.applications = args.result;
            $.publish(wmJs.Data.Topics.applicationInstancesRequest, {replyTo: self.cid});
        },

        /**
         * handle response from persistence layer for all app instances
         */
        appInstancesInit: function (self,evt,args) {
            if(_.isUndefined(args.replyFor) || args.replyFor != self.cid) return;

            self.instances = args.result;
            _.each(self.instances, function (e) {

                var app = _.filter(self.applications, function (a) {
                    return a.id == e.values.appId;
                })[0];            
                
                e.instance = wmJs.Factories.WindowedApplicationFactory.getWindowedApplication(
                    app.values.factoryKey, {
                        parentView: self.el,
                        key: e.id,
                        config:e.values
                    });
            });
            self.viewReady();
        },

        /**
         * final step in the pipeline. initialize all windows and 
         * slice in templates
         */
        viewReady: function () {
            this.applyWorkspaceConfiguration();
            this.$el.html('');

            var self = this;
            _.each(this.instances, function (e) {
               if(self.currentWorkspace.id == e.values.workspaceId){
                    self.$el.append(e.instance.el);
                    e.instance.render({resetTemplate: true});
               } 
            });
        }, 

        publishCurrentWorkspace: function (self,evt,args) {
            $.publish(wmJs.Data.Topics.currentWorkspaceResponse,
                      {result: self.currentWorkspace, replyFor: args.replyTo});    
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
            this.$el.css('width', this.currentWorkspace.values.width)
                    .css('height', this.currentWorkspace.values.height);
        }

    });

})();
