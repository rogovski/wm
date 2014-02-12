/*global wmJs, Backbone, JST*/

wmJs.Views = wmJs.Views || {};

(function () {
    'use strict';

    wmJs.Views.BrowserEventManagerView = Backbone.View.extend({

        template: JST['app/scripts/templates/browser_event_manager.ejs'],

        el: window,

        events: {
        	'keydown' : 'keydownHandler',
        	'click' : 'windowClickHandler'
        },

        modalShowHandled: null,

        isWindowInFocus: null,

        initialize: function () {
        	this.modalShowHandled = false;
            this.isWindowInFocus  = false;

            $('body').append(this.template);

            this.$el.on('keydown', _.throttle(_.partial(this._wPressHandler, this), 1000));

        },

        _wPressHandler: function (self, e) {
            if(!self.isWindowInFocus) return;

            if(e.keyCode == 87 && !self.modalShowHandled) { // w was pressed
                self.modalShowHandled = true;
                $('.workspace-selector-modal').modal('show');
            } else if (e.keyCode == 87 && self.modalShowHandled) {// w was pressed
                self.modalShowHandled = false;
                $('.workspace-selector-modal').modal('hide');
            }  else { }
        }, 


        /**
         * +----------+----------+
         * |          |          |
         * |     1    |     2    |
         * |          |          |
         * +----------+----------+
         * |          |          |
         * |     3    |     4    |
         * |          |          |
         * +----------+----------+
         */
        keydownHandler: function (e) {
            
            if(!this.isWindowInFocus) return;

            if      (e.keyCode == 37 && this.modalShowHandled) this.leftKeyHelper();
            else if (e.keyCode == 39 && this.modalShowHandled) this.rightKeyHelper();
            else if (e.keyCode == 38 && this.modalShowHandled) this.upKeyHelper();
            else if (e.keyCode == 40 && this.modalShowHandled) this.downKeyHelper();
            else {}
        },

        // 4 -> 3
        // 2 -> 1
        leftKeyHelper: function () {
            if ( wmJs.CssHooks.WorkspaceSelect.isInLowerRight() ){
                wmJs.CssHooks.WorkspaceSelect.lowerLeft();
                $.publish(wmJs.Data.Topics.workspaceChanged, {from: 'workspace_4', to: 'workspace_3'});
                return;
            } 
            if ( wmJs.CssHooks.WorkspaceSelect.isInUpperRight() ) {
                wmJs.CssHooks.WorkspaceSelect.upperLeft();
                $.publish(wmJs.Data.Topics.workspaceChanged, {from: 'workspace_2', to: 'workspace_1'});
                return;
            }            
        },

        // 3 -> 4
        // 1 -> 2
        rightKeyHelper : function () {
            if ( wmJs.CssHooks.WorkspaceSelect.isInLowerLeft() ){
                wmJs.CssHooks.WorkspaceSelect.lowerRight();
                $.publish(wmJs.Data.Topics.workspaceChanged, {from: 'workspace_3', to: 'workspace_4'});
                return;
            }  
            if ( wmJs.CssHooks.WorkspaceSelect.isInUpperLeft() ) {
                wmJs.CssHooks.WorkspaceSelect.upperRight();
                $.publish(wmJs.Data.Topics.workspaceChanged, {from: 'workspace_1', to: 'workspace_2'});
                return;
            }            
        },

        // 3 -> 1
        // 4 -> 2
        upKeyHelper: function () {
            if ( wmJs.CssHooks.WorkspaceSelect.isInLowerLeft() ){
                wmJs.CssHooks.WorkspaceSelect.upperLeft();
                $.publish(wmJs.Data.Topics.workspaceChanged, {from: 'workspace_3', to: 'workspace_1'});
                return;
            } 
            if ( wmJs.CssHooks.WorkspaceSelect.isInLowerRight() ) {
                wmJs.CssHooks.WorkspaceSelect.upperRight();
                $.publish(wmJs.Data.Topics.workspaceChanged, {from: 'workspace_4', to: 'workspace_2'});
                return;
            }            
        },

        // 1 -> 3
        // 2 -> 4
        downKeyHelper: function () {
            if ( wmJs.CssHooks.WorkspaceSelect.isInUpperLeft() ){
                wmJs.CssHooks.WorkspaceSelect.lowerLeft();
                $.publish(wmJs.Data.Topics.workspaceChanged, {from: 'workspace_1', to: 'workspace_3'});
                return;
            } 
            if ( wmJs.CssHooks.WorkspaceSelect.isInUpperRight() ) {
                wmJs.CssHooks.WorkspaceSelect.lowerRight();
                $.publish(wmJs.Data.Topics.workspaceChanged, {from: 'workspace_2', to: 'workspace_4'});
                return;
            }            
        },

        windowClickHandler: function (e) {
        	if(!$(e.target).hasClass('app-top')) {
                this.isWindowInFocus = false;
        		console.log('window lost focus');
        	}
        	else {
                this.isWindowInFocus = true;
                $.publish(wmJs.Data.Topics.appInstanceFocusChanged, {sender: 'window'});
        		console.log('window in focus');
        	}
        	
        }

    });

})();
