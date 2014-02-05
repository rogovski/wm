/*global wmJs, Backbone, JST*/

wmJs.Views = wmJs.Views || {};

(function () {
    'use strict';

    var ApplicationWindowView = function (options) {
        this.config = options.config;
        this.$parentView = $(options.parentView);

        //$.subscribe(...);

        Backbone.View.apply(this, [options]);
    };

    _.extend(ApplicationWindowView.prototype, Backbone.View.prototype, {

        windowTemplate: JST['app/scripts/templates/application_window.ejs'],

        window_events_base: {
            "click .btn-pin"		: "btnPinClickHandler",
            "click .btn-draggable" 	: "btnDragClickHandler",
            "click .btn-close"		: "windowCloseHandler"    
        },

        render: function (args) {
            var self = this;

            if(args.resetTemplate){
                self.$el.html(self.windowTemplate());   
            }
            
            self.$windowcontainer = self.$el.find('.window');
            self.$btnPin          = self.$el.find('.btn-pin');    
            self.$btnDraggable    = self.$el.find('.btn-draggable'); 
            self.$windowcontent   = $(self.$el.find('.window-content')[0]);
            if(!self.$windowcontent.length){
                throw new Error(".window content doesn't exist");
            }

            self.window_render(args);

            self.$windowcontainer.draggable({ 
                    containment: self.$parentView, 
                    disabled: false,
                    drag: function (event, ui) {
                        self.config.left = ui.position.left;
                        self.config.top = ui.position.top;
                    }
            });
            
            self.$windowcontent
                .resizable({ resize: function (ui,event) {
                    var res = $(this);
                    self.config.height = res.height();
                    self.config.width = res.width();                                                 
                }}); 

            this.applyConfiguration();     
        },

        events: function () {
            return _.extend({},this.window_events_base, this.window_events)
        },

        applyConfiguration: function () {

            this.$windowcontent.css('height', this.config.height)
                               .css('width', this.config.width);

            this.$windowcontainer.css('left', this.config.left)
                                 .css('top', this.config.top);

            if(this.config.affixed) {
                this.$windowcontainer.css('position', 'fixed');
                this.deactivate(this.$btnPin);
            } else {
                this.$windowcontainer.css('position', 'absolute');
                this.activate(this.$btnPin);
            }

            if(this.config.draggable) {
              this.$windowcontainer.draggable({ disabled: false });
              this.activate(this.$btnDraggable);
            } else {
              this.$windowcontainer.draggable({ disabled: true });
              this.deactivate(this.$btnDraggable);
            }

            if(!this.config.visible){
                this.$windowcontainer.hide();
            }             
        },

        btnPinClickHandler: function (e) {
            var pos = this.$windowcontainer.css('position');

            if(pos == 'fixed') {
                this.$windowcontainer.css('position', 'absolute');
                this.activate(this.$btnPin);
                this.config.affixed = false;
            } else {
                this.$windowcontainer.css('position', 'fixed');
                this.deactivate(this.$btnPin);
                this.config.affixed = true;
            }
        },

        btnDragClickHandler: function (e) {
           var isDisabled = this.$windowcontainer.draggable( 'option', 'disabled' );
            if(isDisabled) {
              this.$windowcontainer.draggable({ disabled: false });
              this.activate(this.$btnDraggable);
              this.config.draggable = true;
            } else {
              this.$windowcontainer.draggable({ disabled: true });
              this.deactivate(this.$btnDraggable);
              this.config.draggable = false;
            }
        },

        activate: function (sel) {
            sel.addClass('btn-default').removeClass('btn-link');
        },

        deactivate: function (sel) {
            sel.addClass('btn-link').removeClass('btn-default');
        }          

    });

    ApplicationWindowView.extend = Backbone.View.extend;
    wmJs.ApplicationWindowView = wmJs.ApplicationWindowView || {};
    wmJs.ApplicationWindowView = ApplicationWindowView;

})();