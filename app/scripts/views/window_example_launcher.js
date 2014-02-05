/*global wm, Backbone, JST*/

wmJs.Views = wmJs.Views || {};

(function () {
    'use strict';

    wmJs.Views.WindowExampleLauncherView = wmJs.ApplicationWindowView.extend({

        template: JST['app/scripts/templates/window_example_launcher.ejs'],

        launcherButton: JST['app/scripts/templates/window_example_launcher_button.ejs'],

        window_events: {
        	//'click button' : 'laucherButtonClickHandler'
        },

        registerSubscriptions: function () {
            $.subscribe('launcher.getUniqueWindows', 
                        _.partial(this.recieveUniqueWindows,this));
        },

        initialize: function () {
        	this.registerSubscriptions();
        },

        window_render: function () {
        	this.$windowcontent.html(this.template());
        	console.log('render');
        	this.requestUniqueWindows();
        },

        laucherButtonClickHandler: function (e) {
        	console.log(e);
        },
        
        requestUniqueWindows: function () {
            $.publish(WM.topics.windowConfigRequest, {
                publishTo: 'launcher.getUniqueWindows', 
                resource: 'WindowTypes', 
                transform: function (obj) {
                    return { result: obj() };
                } 
            });        	
        },

        recieveUniqueWindows: function (self,evt,args) {
        	self.$launcherList = self.$windowcontent.find('.launcher-list');
        	self.$launcherList.html('');

        	args.result.forEach(function (e,i) {
        		self.$launcherList.append(self.launcherButton(e));
        	});
        }

    });

    WM.WindowedApplicationFactory
      .registerApplication('window_launcher', 'launcher',
      					   wmJs.Views.WindowExampleLauncherView);
})();
