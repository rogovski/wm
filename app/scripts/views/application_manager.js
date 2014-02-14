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

            $.subscribe(wmJs.Data.Topics.applicationsResponse,
                         _.partial(this.applicationsInit,this));

            $.subscribe(wmJs.Data.Topics.workspacesResponse,
                         _.partial(this.workspacesInit,this));

            $.subscribe(wmJs.Data.Topics.applicationInstancesResponse,
                         _.partial(this.appInstancesInit,this));

            $.subscribe(wmJs.Data.Topics.currentWorkspaceRequest,
                         _.partial(this.publishCurrentWorkspace,this));

            $.subscribe(wmJs.Data.Topics.appInstancePersistCreated,
                         _.partial(this.handleInstanceCreatedNotification, this));

            $.subscribe(wmJs.Data.Topics.instanceRequestDeallocation,
                         _.partial(this.handleInstanceDeleteNotification, this));

            $.subscribe(wmJs.Data.Topics.workspaceChanged,
                         _.partial(this.handleWorkspaceChangedNotification, this));
        },

        /*
         * @constructs
         */
        initialize: function (config) {
        	config                 || 
                wmJs.Exception.ConfigPropertyMissing('initialize');

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
            config.appDataSource   || 
                wmJs.Exception.ConfigPropertyMissing('initialize:appDataSource');

            /**
             * Window factory is a function that constructs a window
             * when given a lookup key and initialization arguments
             */
            config.appFactory      ||
                wmJs.Exception.ConfigPropertyMissing('initialize:appFactory');


            /**
             * pubsub messages used throughout the application 
             */
            config.appMessages     ||
                wmJs.Exception.ConfigPropertyMissing('initialize:appMessages'); 


            this.registerSubscriptions();
        },

        render: function () {
            $.publish(wmJs.Data.Topics.workspacesRequest, {
                replyTo: this.cid
            });            
        },

        /**
         * first step of initialization pipeline
         * handle response from persistence layer for all workspaces
         */
        workspacesInit: function (self,evt,args) {
            if(_.isUndefined(args.replyFor) || args.replyFor != self.cid) return;

            self.workspaces       = args.result;
            self.currentWorkspace = wmJs.Util.getDefaultWorkspace(self.workspaces);
            
            // before publishing request to persistence layer (for stored application info),
            // get list of registered applications from config.appFactory. new applications
            // might be registered that the persistance layer is not aware of
            var infoFromFactory = wmJs.Factories.WindowedApplicationFactory
                                      .registeredApplicationsInfo();

            $.publish(wmJs.Data.Topics.applicationsRequest, {
                replyTo: self.cid,
                applications: infoFromFactory
            });
        },

        /**
         * second step of initialization pipeline
         * handle response from persistence layer for all applications
         */
        applicationsInit: function (self,evt,args) {
            if(_.isUndefined(args.replyFor) || args.replyFor != self.cid) return;

            self.applications = args.result;
            $.publish(wmJs.Data.Topics.applicationInstancesRequest, {replyTo: self.cid});
        },

        /**
         * third step of initialization pipeline
         * handle response from persistence layer for all app instances
         */
        appInstancesInit: function (self,evt,args) {
            if(_.isUndefined(args.replyFor) || args.replyFor != self.cid) return;
            console.log(args.result);
            self.instances = args.result;

            _.each(self.instances, function (e) {
                var app = wmJs.Util.getAppInfo(self.applications, e.values.appId);
                
                if ( !e.instance ) {
                    e.instance = wmJs.Factories.WindowedApplicationFactory.getWindowedApplication(
                        app.values.factoryKey, {
                            parentView: self.el,
                            key: e.id,
                            //values should only be updated by the view that owns them  
                            config:wmJs.Util.cloneInstance(e.values)
                        });                  
                }
            });

            self.viewReady();
        },

        /**
         * final step of initialization pipeline. 
         * initialize all windows and slice in templates.
         * this should only be called once throughout the lifetime of the
         * application. ALL INSTANCES, whether in the current workspace or not,
         * SHOULD BE IN THE DOM.
         */
        viewReady: function () {
            this.applyWorkspaceConfiguration();
            this.$el.html('');

            var self = this;
            _.each(this.instances, function (e) {
                $(e.instance.el).hide();
                self.$el.append(e.instance.el);
                e.instance.render({resetTemplate: true});

                if(self.currentWorkspace.id == e.values.workspaceId){
                    $(e.instance.el).show();
                } 
            });
        }, 

        /**
         * broadcast the workspace that the app mananger has in focus
         */
        publishCurrentWorkspace: function (self,evt,args) {
            $.publish(wmJs.Data.Topics.currentWorkspaceResponse,
                      {result: self.currentWorkspace, replyFor: args.replyTo});
        },

        /**
         * subscription handler that is called when a new window gets allocated
         */
        handleInstanceCreatedNotification: function (self,evt,args) {
            var newInst = args.result,
                app = wmJs.Util.getAppInfo(self.applications, newInst.values.appId); 

            newInst.instance = wmJs.Factories.WindowedApplicationFactory.getWindowedApplication(
                app.values.factoryKey, {
                    parentView: self.el,
                    key: newInst.id,
                    //values should only be updated by the view that owns them  
                    config:wmJs.Util.cloneInstance(newInst.values)
                });

            $(newInst.instance.el).hide();
            self.$el.append(newInst.instance.el);
            newInst.instance.render({resetTemplate: true});

           if(self.currentWorkspace.id == newInst.values.workspaceId){
                $(newInst.instance.el).show();
           }
           self.instances.push(newInst);
        },

        /**
         * subscription handler that is called when a window requests deallocation
         */
        handleInstanceDeleteNotification: function (self,evt,args) {
            $.publish(wmJs.Data.Topics.persistHandleInstanceDeallocation, args);
            // since appmanager controls the view instance, we have to
            // set it to null as well.
        },

        /**
         * set width and height of the currently rendered workspace
         */
        applyWorkspaceConfiguration: function () {
            this.$el.css('width', this.currentWorkspace.values.width)
                    .css('height', this.currentWorkspace.values.height);
        },

        handleWorkspaceChangedNotification: function (self,evt,args) {
            if(_.isUndefined(args) || _.isUndefined(args.from) || _.isUndefined(args.to)) 
                return;

            var res = wmJs.Util.bringAffixedToWorkspace(self.instances, args.from, args.to);
            
            // change current workspace of manager
            // TODO: update values property of current workspace
            self.currentWorkspace.id = args.to;
        },

        handleKeyDown: function (e) {
            console.log(e);
        }

    });

})();
