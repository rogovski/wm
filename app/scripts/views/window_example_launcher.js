/*global wm, Backbone, JST*/

wmJs.Views = wmJs.Views || {};

(function () {
    'use strict';

    wmJs.Views.WindowExampleLauncherView = wmJs.ApplicationWindowView.extend({

        template: JST['app/scripts/templates/window_example_launcher.ejs'],

        launcherButton: JST['app/scripts/templates/window_example_launcher_button.ejs'],

        applications: null,

        currentWorkspace: null,

        workspaces: null,

        instances: null,

        window_events: {
        	'click .launcher-btn' : 'laucherButtonClickHandler',
            'click .lbtn-max': 'launcherButtonMaxHandler',
            'click .lbtn-min': 'launcherButtonMinHandler',
            'click .lbtn-close': 'launcherButtonCloseHandler',
            'click .lbtn-new' : 'launcherButtonNewHandler',
            'click .btn-save-workspace': 'saveWorkspaceHandler'
        },

        registerSubscriptions: function () {
            $.subscribe(wmJs.Data.Topics.applicationsResponse,
                         _.partial(this.getApplications,this));

            $.subscribe(wmJs.Data.Topics.workspacesResponse,
                         _.partial(this.getWorkspaces,this));

            $.subscribe(wmJs.Data.Topics.currentWorkspaceResponse,
                         _.partial(this.getCurrentWorkspaces,this));

            $.subscribe(wmJs.Data.Topics.applicationInstancesResponse,
                         _.partial(this.getAppInstances,this));

            $.subscribe(wmJs.Data.Topics.windowMinimizedNotification,
                         _.partial(this.handleWindowMinimizeNotification,this));

            $.subscribe(wmJs.Data.Topics.windowMaximizedNotification,
                         _.partial(this.handleWindowMaximizeNotification,this));    

            $.subscribe(wmJs.Data.Topics.appInstancePersistCreated,
                         _.partial(this.handleInstanceCreatedNotification, this));
        },

        initialize: function () {
        	this.registerSubscriptions();
        },

        window_render: function () {
        	this.$windowcontent.html(this.template());
            $.publish(wmJs.Data.Topics.workspacesRequest, {replyTo: this.cid});            
        },

        /**
         * handle response from persistence layer for all workspaces
         */
        getWorkspaces: function (self,evt,args) {
            if(_.isUndefined(args.replyFor) || args.replyFor != self.cid) return;

            self.workspaces       = args.result;
            self.currentWorkspace = _.filter(self.workspaces, function (obj) {
                return obj.values.isDefault === true;
            })[0];

            $.publish(wmJs.Data.Topics.currentWorkspaceRequest, {replyTo: self.cid});
        },

        getCurrentWorkspaces: function (self,evt,args) {
            if(_.isUndefined(args.replyFor) || args.replyFor != self.cid) return;

            self.currentWorkspace = args.result;
            $.publish(wmJs.Data.Topics.applicationsRequest, {replyTo: self.cid});     
        },

        /**
         * handle response from persistence layer for all applications
         */
        getApplications: function (self,evt,args) {
            if(_.isUndefined(args.replyFor) || args.replyFor != self.cid) return;

            self.applications = args.result;
            $.publish(wmJs.Data.Topics.applicationInstancesRequest, {replyTo: self.cid});
        },

        /**
         * handle response from persistence layer for all app instances
         */
        getAppInstances: function (self,evt,args) {
            if(_.isUndefined(args.replyFor) || args.replyFor != self.cid) return;
            
            self.instances = args.result;
            self.viewReady();
        },

        /**
         * final step in the pipeline. initialize all windows and 
         * slice in templates
         */
        viewReady: function () {
            this.$launcherList = this.$windowcontent.find('.launcher-list');
            this.$launcherList.html('');
            var self = this;

            _.each(this.applications, function (e) {
                var instances = wmJs.Util.getInstancesByApp(self.instances, e.id);

                self.$launcherList.append(self.launcherButton({
                    display: e.values.display,
                    appId: e.id,
                    instances: instances
                }));
            })
        }, 

        laucherButtonClickHandler: function (e) {
        	var elem = $(e.currentTarget).attr('class');
            console.log(elem);
        },

        /*********************************************************************/
        /* WINDOW MINIMIZATION
        /*********************************************************************/
        /**
         * event handler for local events
         */            
        launcherButtonMinHandler: function (e) {
            var id = $(e.currentTarget).attr('class').split(' ')[0];
            wmJs.CssHooks.LauncherInstance.minimize(
                this.$launcherList, id);
        },
        /**
         * event handler for events via pub/sub
         */   
        handleWindowMinimizeNotification: function (self,evt,args) {
            wmJs.CssHooks.LauncherInstance.minimize(
                self.$launcherList, args.id);
        },

        /*********************************************************************/
        /* WINDOW MAXIMIZATION
        /*********************************************************************/ 
        launcherButtonMaxHandler: function (e) {
            var id = $(e.currentTarget).attr('class').split(' ')[0];
            wmJs.CssHooks.LauncherInstance.maximize(
                this.$launcherList, id);
        },
 
        handleWindowMaximizeNotification: function (self,evt,args) {
            wmJs.CssHooks.LauncherInstance.maximize(
                self.$launcherList, args.id);
        },

        /*********************************************************************/
        /* WINDOW CLOSING
        /*********************************************************************/ 
        launcherButtonCloseHandler: function (e) {
            console.log(e);
        },

        /*********************************************************************/
        /* WINDOW ALLOCATION
        /*********************************************************************/ 
        launcherButtonNewHandler: function (e) {
            var appId = $(e.currentTarget).attr('class').split(' ')[0];
            $.publish(wmJs.Data.Topics.requestAppInstanceCreation, { 
                data: {
                    appId: appId, 
                    workspaceId:this.currentWorkspace.id
                }
            });
        },

        handleInstanceCreatedNotification: function (self,evt,args) {
            $.publish(wmJs.Data.Topics.applicationInstancesRequest, {
                replyTo: self.cid
            });
        },

        /*********************************************************************/
        /* APPLICATION WORKSPACES
        /*********************************************************************/ 
        saveWorkspaceHandler: function () {
            var self = this;
            $.publish(wmJs.Data.Topics.workspaceSaveNotifyPersistanceLayer, {
                currentWorkspace: self.currentWorkspace.id 
            });    
        },



    });

    wmJs.Factories.WindowedApplicationFactory
      .registerApplication('window_launcher', 'launcher', '*',
      					   wmJs.Views.WindowExampleLauncherView);
})();
