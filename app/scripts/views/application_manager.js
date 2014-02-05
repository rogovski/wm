/*global wmJs, Backbone, JST*/

wmJs.Views = wmJs.Views || {};


(function () {
    'use strict';

    wmJs.Views.ApplicationManagerView = Backbone.View.extend({

        currentWorkspace: null,

        template: JST['app/scripts/templates/application_manager.ejs'],

        registerSubscriptions: function () {
            $.subscribe(WM.topics.viewInitialized, _.partial(this.workspaceInit,this));
            $.subscribe(WM.topics.workspaceLoaded, _.partial(this.windowsInit,this));
            $.subscribe(WM.topics.workspaceWindowsLoaded, _.partial(this.viewReady, this));
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

            self.$el.html('');
            self.applyWorkspaceConfiguration();

            self.WindowConfigList.data.forEach(function (e,i) {
                e.instance = self.WindowFactory(e.factoryKey, {
                    parentView: self.el,
                    config: e
                });
                self.$el.append(e.instance.el);
                e.instance.render({resetTemplate: true});
            });
        }, 

        applyWorkspaceConfiguration: function () {
            this.$el.css('width', this.WorkspaceConfig.width)
                    .css('height', this.WorkspaceConfig.height);
        }

    });

})();
