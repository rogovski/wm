var $                    = require('jquery'),
    _                    = require('underscore'),
    Backbone             = require('backbone'),
    backend              = require('../backends/memory.js'),
    sessionManager       = require('../session/manager.js'),
    spinner              = require('./prompts/spinner.js'),
    userLoginOrCreateNew = require('./prompts/userLoginOrCreateNew.js'),
    userLogin            = require('./prompts/userLogin.js'),
    userCreate           = require('./prompts/userCreateNew.js'),
    prompt               = require('./controls/prompt.js');


var _Client = Backbone.View.extend({

    template: JST['client.html'],

    currentPrompt: null,

    initialize: function ( options ) {
        // TODO: need to find the best way to specify what backend we are using

        $.subscribe('session.manager.load',     this.handleSessionManagerLoad.bind(this));

        $.subscribe('client.userLoginOrCreate', this.handleUserLoginOrCreate.bind(this));
        $.subscribe('client.userLogin',         this.handleUserLogin.bind(this));
        $.subscribe('client.userCreate',        this.handleUserCreate.bind(this));
    },


    setCurrentPrompt: function (promptView) {

        var self = this,
            cb = function () {
                self.currentPrompt = promptView;

                promptView.$el.hide();

                self.$el.html(promptView.el);

                promptView.render();

                promptView.show();
            };

        if(_.isNull(this.currentPrompt)) cb();
        else this.currentPrompt.hide({ onHidden: cb });
    },


    render: function () {
        this.$el.html( this.template() );

        this.spin                 = spinner.create();

        this.userLoginOrCreateNew = userLoginOrCreateNew.create();

        this.userLogin            = userLogin.create( {
            onPrevious: 'client.userLoginOrCreate'
        } );

        this.userCreate           = userCreate.create( {
            onPrevious: 'client.userLoginOrCreate'
        } );

        this.spin.setMessage('loading');
        this.handleSpinner();

        sessionManager.loadSessionManager({ backend: backend });
    },

    handleSpinner: function () {
        this.setCurrentPrompt(this.spin);
    },

    handleSessionManagerLoad: function ( e, args ) {
        this.handleUserLoginOrCreate();
    },

    handleUserLoginOrCreate: function () {
        this.setCurrentPrompt(this.userLoginOrCreateNew);
    },

    handleUserLogin: function () {
        this.setCurrentPrompt(this.userLogin);
    },

    handleUserCreate: function () {
        this.setCurrentPrompt(this.userCreate);
    }

});
exports.Client = _Client;