var $                    = require('jquery'),
    _                    = require('underscore'),
    Backbone             = require('backbone'),
    backend              = require('../backends/memory.js'),
    sessionManager       = require('../session/manager.js'),
    spinner              = require('./prompts/spinner.js'),
    userLoginOrCreateNew = require('./prompts/userLoginOrCreateNew.js'),
    userLogin            = require('./prompts/userLogin.js'),
    prompt               = require('./controls/prompt.js');


var _Client = Backbone.View.extend({

    template: JST['client.html'],

    initialize: function ( options ) {
        // TODO: need to find the best way to specify what backend we are using

        $.subscribe('session.manager.load', this.handleSessionManagerLoad.bind(this));

        $.subscribe('client.userLoginOrCreate', this.handleUserLoginOrCreate.bind(this));
        $.subscribe('client.userLogin', this.handleUserLogin.bind(this));
    },

    render: function () {
        this.$el.html( this.template() );

        this.spin                 = spinner.create();

        this.userLoginOrCreateNew = userLoginOrCreateNew.create();

        this.userLogin            = userLogin.create( {
            onPrevious: 'client.userLoginOrCreate'
        } );

        this.spin.setMessage('loading');
        this.handleSpinner();

        sessionManager.loadSessionManager({ backend: backend });
    },


    // TODO: instead of all this 'hideAllVisiblePrompts' bullshit,
    // just make set the currently active prompt in a member variable.
    // then when the next prompt gets called, just hide the currently active
    // and make the next prompt the currently active one

    handleSpinner: function () {

        var self = this;
        prompt.hideAllVisiblePrompts({
            onHidden: function () {
                self.$el.html(self.spin.el);
                self.spin.render();
                self.spin.show();
            }
        });
    },


    handleSessionManagerLoad: function ( e, args ) {
        this.handleUserLoginOrCreate();
    },

    handleUserLoginOrCreate: function () {
        var self = this;
        prompt.hideAllVisiblePrompts({
            onHidden: function () {
                self.$el.html(self.userLoginOrCreateNew.el);
                self.userLoginOrCreateNew.render();
                self.userLoginOrCreateNew.show();
            }
        });
    },

    handleUserLogin: function () {
        var self = this;
        prompt.hideAllVisiblePrompts({
            onHidden: function () {
                self.$el.html(self.userLogin.el);
                self.userLogin.render();
                self.userLogin.show();
            }
        });
    }

});
exports.Client = _Client;