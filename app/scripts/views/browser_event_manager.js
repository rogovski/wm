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
            } else if (e.keyCode == 27 && self.modalShowHandled) {// w was pressed
                self.modalShowHandled = false;
                $('.workspace-selector-modal').modal('hide');
            }  else { }

            e.preventDefault();
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

            if      (e.keyCode == 37 && this.modalShowHandled) this.leftHelper();
            else if (e.keyCode == 39 && this.modalShowHandled) this.rightHelper();
            else if (e.keyCode == 38 && this.modalShowHandled) this.upHelper();
            else if (e.keyCode == 40 && this.modalShowHandled) this.downHelper();
            else {}
        },

        // 4 -> 3
        // 2 -> 1
        leftHelper: function () {
            if ( wmJs.CssHooks.WorkspaceSelect.isInLowerRight() ){
                wmJs.CssHooks.WorkspaceSelect.lowerLeft();
                $.publish(wmJs.Data.Topics.workspaceChanged, {from: 'workspace_4', to: 'workspace_3'});
                return true;
            } 
            if ( wmJs.CssHooks.WorkspaceSelect.isInUpperRight() ) {
                wmJs.CssHooks.WorkspaceSelect.upperLeft();
                $.publish(wmJs.Data.Topics.workspaceChanged, {from: 'workspace_2', to: 'workspace_1'});
                return true;
            } 
            return false;           
        },

        // 3 -> 4
        // 1 -> 2
        rightHelper : function () {
            if ( wmJs.CssHooks.WorkspaceSelect.isInLowerLeft() ){
                wmJs.CssHooks.WorkspaceSelect.lowerRight();
                $.publish(wmJs.Data.Topics.workspaceChanged, {from: 'workspace_3', to: 'workspace_4'});
                return true;
            }  
            if ( wmJs.CssHooks.WorkspaceSelect.isInUpperLeft() ) {
                wmJs.CssHooks.WorkspaceSelect.upperRight();
                $.publish(wmJs.Data.Topics.workspaceChanged, {from: 'workspace_1', to: 'workspace_2'});
                return true;
            }         
            return false;   
        },

        // 3 -> 1
        // 4 -> 2
        upHelper: function () {
            if ( wmJs.CssHooks.WorkspaceSelect.isInLowerLeft() ){
                wmJs.CssHooks.WorkspaceSelect.upperLeft();
                $.publish(wmJs.Data.Topics.workspaceChanged, {from: 'workspace_3', to: 'workspace_1'});
                return true;
            } 
            if ( wmJs.CssHooks.WorkspaceSelect.isInLowerRight() ) {
                wmJs.CssHooks.WorkspaceSelect.upperRight();
                $.publish(wmJs.Data.Topics.workspaceChanged, {from: 'workspace_4', to: 'workspace_2'});
                return true;
            }            
            return false;
        },

        // 1 -> 3
        // 2 -> 4
        downHelper: function () {
            if ( wmJs.CssHooks.WorkspaceSelect.isInUpperLeft() ){
                wmJs.CssHooks.WorkspaceSelect.lowerLeft();
                $.publish(wmJs.Data.Topics.workspaceChanged, {from: 'workspace_1', to: 'workspace_3'});
                return true;
            } 
            if ( wmJs.CssHooks.WorkspaceSelect.isInUpperRight() ) {
                wmJs.CssHooks.WorkspaceSelect.lowerRight();
                $.publish(wmJs.Data.Topics.workspaceChanged, {from: 'workspace_2', to: 'workspace_4'});
                return true;
            }            
            return false;
        },

        // 1 -> 4
        // 4 -> 1
        diagTopLeftBottomRightHelper: function () {
            if ( wmJs.CssHooks.WorkspaceSelect.isInUpperLeft() ){
                wmJs.CssHooks.WorkspaceSelect.lowerRight();
                $.publish(wmJs.Data.Topics.workspaceChanged, {from: 'workspace_1', to: 'workspace_4'});
                return true;
            } 
            if ( wmJs.CssHooks.WorkspaceSelect.isInLowerRight() ) {
                wmJs.CssHooks.WorkspaceSelect.upperLeft();
                $.publish(wmJs.Data.Topics.workspaceChanged, {from: 'workspace_4', to: 'workspace_1'});
                return true;
            }              
            return false;  
        },

        // 2 -> 3
        // 3 -> 2
        diagTopRightBottomLeftHelper: function () {
            if ( wmJs.CssHooks.WorkspaceSelect.isInUpperRight() ){
                wmJs.CssHooks.WorkspaceSelect.lowerLeft();
                $.publish(wmJs.Data.Topics.workspaceChanged, {from: 'workspace_2', to: 'workspace_3'});
                return true;
            } 
            if ( wmJs.CssHooks.WorkspaceSelect.isInLowerLeft() ) {
                wmJs.CssHooks.WorkspaceSelect.upperRight();
                $.publish(wmJs.Data.Topics.workspaceChanged, {from: 'workspace_3', to: 'workspace_2'});
                return true;
            }                
            return false;
        },

        windowClickHandler: function (e) {
            console.log(e.target);
            if(this.modalShowHandled) {
                var elt;
                var $target = $(e.target);

                if($(e.target).hasClass('ws-inner-elt')){
                    elt = $(e.target).parent().attr('class');
                }

                if( _.contains(['top-left-ws','top-right-ws',
                               'bottom-left-ws','bottom-right-ws'], 
                               $(e.target).attr('class')) ) {

                    elt = $(e.target).attr('class');
                }

                if(_.isUndefined(elt)) return;


                // top left was clicked on
                /**********************************//*
                if(elt == 'top-left-ws') {
                    if( wmJs.CssHooks.WorkspaceSelect.isInLowerRight() ) this.diagTopLeftBottomRightHelper();
                    else if ( this.rightHelper() ) return;
                    else if ( this.downHelper() ) return;
                    else {}
                }
                else if(elt == 'top-right-ws') {
                    if( wmJs.CssHooks.WorkspaceSelect.isInLowerLeft() ) this.diagTopRightBottomLeftHelper();
                    else if ( this.leftHelper() ) return;
                    else if (  ) return;
                    else {}
                }
                else if(elt == 'bottom-left-ws') {
                    if( wmJs.CssHooks.WorkspaceSelect.isInUpperRight() ) this.diagTopRightBottomLeftHelper();
                    else if (  ) return;
                    else if (  ) return;
                    else {}
                }
                else if(elt == 'bottom-right-ws') {
                    if( wmJs.CssHooks.WorkspaceSelect.isInUpperLeft() ) this.diagTopLeftBottomRightHelper();
                    else if (  ) return;
                    else if (  ) return;
                    else {}
                }
                else {}
                *//******************************/
                return;
            }
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
