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

        $.subscribe(         'loaded.session.manager', this.handleSessionManagerLoad.bind(this));
        $.subscribe('created.newuser.session.manager', this.handleSessionManagerUserCreated.bind(this));
        $.subscribe( 'failed.newuser.session.manager', this.handleSessionManagerUserCreateFailure.bind(this));

        $.subscribe('userLoginOrCreate.client',  this.handleUserLoginOrCreate.bind(this));
        $.subscribe(        'userLogin.client',  this.handleUserLogin.bind(this));
        $.subscribe(       'userCreate.client',  this.handleUserCreate.bind(this));
        $.subscribe('submit.userCreate.client',  this.handleUserCreateSubmit.bind(this));
    },


    setCurrentPrompt: function (promptView, options) {

        var self = this,
            cb = function () {
                self.currentPrompt = promptView;

                promptView.$el.hide();

                self.$el.html(promptView.el);

                promptView.render();

                promptView.setPromptOptions( options );

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
            onPrevious: 'userLoginOrCreate.client'
        } );

        this.userCreate           = userCreate.create( {
            onPrevious: 'userLoginOrCreate.client'
        } );

        this.spin.setMessage('loading');
        this.handleSpinner();

        sessionManager.loadSessionManager({ backend: backend });
    },

    handleSpinner: function ( e, args ) {
        this.setCurrentPrompt(this.spin);
    },

    handleSessionManagerLoad: function ( e, args ) {
        console.log(args);
        this.handleUserLoginOrCreate();
    },

    handleUserLoginOrCreate: function ( e, args ) {
        this.setCurrentPrompt(this.userLoginOrCreateNew);
    },

    handleUserLogin: function ( e, args ) {
        this.setCurrentPrompt(this.userLogin);
    },

    handleUserCreate: function ( e, args ) {
        this.setCurrentPrompt(this.userCreate);
    },

    handleUserCreateSubmit: function (e,args) {
        this.spin.setMessage('attempting to create user');

        this.handleSpinner();

        sessionManager.createNewUser(args.model);
    },

    // if this get called, @args is an object that contains a model of
    // type User
    handleSessionManagerUserCreated: function (e,args) {
        new Error('not impl');
    },

    // if this get called, @args is an object that contains a model of
    // type UserCreateForm e.g the orignal model dealt with in the
    // handleUserCreateSubmit method
    handleSessionManagerUserCreateFailure: function (e,args) {
        new Error('not impl');
    },

});
exports.Client = _Client;