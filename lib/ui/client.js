var $                         = require('jquery'),
    _                         = require('underscore'),
    Backbone                  = require('backbone'),
    backend                   = require('../backends/memory.js'),
    sessionManager            = require('../session/manager.js'),
    flashback                 = require('./prompts/flashback.js'),
    spinner                   = require('./prompts/spinner.js'),
    userLoginOrCreateNew      = require('./prompts/userLoginOrCreateNew.js'),
    userLogin                 = require('./prompts/userLogin.js'),
    userCreate                = require('./prompts/userCreateNew.js'),
    sessionRestoreOrCreateNew = require('./prompts/sessionRestoreOrCreateNew.js'),
    sessionRestore            = require('./prompts/sessionRestore.js'),
    prompt                    = require('./controls/prompt.js');


var _Client = Backbone.View.extend({

    template: JST['client.html'],

    currentPrompt: null,

    currentUser: null,

    initialize: function ( options ) {
        // TODO: need to find the best way to specify what backend we are using

        $.subscribe(                   'loaded.session.manager', this.handleSessionManagerLoad.bind(this));
        $.subscribe(      'success.usersession.session.manager', this.handleUserSessionFetchSuccess.bind(this));
        $.subscribe(       'failed.usersession.session.manager', this.handleUserSessionFetchError.bind(this));

        $.subscribe('created.usercreate.authentication.manager', this.handleAuthManagerUserCreated.bind(this));
        $.subscribe( 'failed.usercreate.authentication.manager', this.handleAuthManagerUserCreateFailure.bind(this));

        $.subscribe( 'success.userlogin.authentication.manager', this.handleAuthManagerUserLogin.bind(this));
        $.subscribe(  'failed.userlogin.authentication.manager', this.handleAuthManagerUserLoginFailure.bind(this));

        $.subscribe('userLoginOrCreate.client',  this.handleUserLoginOrCreate.bind(this));
        $.subscribe(        'userLogin.client',  this.handleUserLogin.bind(this));
        $.subscribe( 'submit.userLogin.client',  this.handleUserLoginSubmit.bind(this));
        $.subscribe(       'userCreate.client',  this.handleUserCreate.bind(this));
        $.subscribe('submit.userCreate.client',  this.handleUserCreateSubmit.bind(this));

        $.subscribe('sessionRestoreOrCreate.client',  this.handleUserSessionRestoreOrCreateNew.bind(this));
        $.subscribe(        'sessionRestore.client',  this.handleUserSessionRestore.bind(this));
        $.subscribe( 'submit.sessionRestore.client',  this.handleUserSessionRestoreSubmit.bind(this));
        $.subscribe(         'sessionCreate.client',  this.handleUserSessionCreate.bind(this));
        $.subscribe(  'submit.sessionCreate.client',  this.handleUserSessionCreateSubmit.bind(this));

        window.cli = this;
        window.mem = backend;
    },


    setCurrentPrompt: function (promptView, options) {

        var self = this,
            cb = function () {
                self.currentPrompt = promptView;

                promptView.$el.hide();

                self.$el.html(promptView.el);

                // TODO: set prompt options should probably be called
                // before render. see what effect this has on stuff
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

        this.redirectFlash        = flashback.create( {
            returnButton: true,
            countdown: 3
        } );

        this.userLoginOrCreateNew = userLoginOrCreateNew.create();

        this.userLogin            = userLogin.create( {
            onPrevious: 'userLoginOrCreate.client'
        } );

        this.userCreate           = userCreate.create( {
            onPrevious: 'userLoginOrCreate.client'
        } );

        this.sessionRestoreOrCreateNew = sessionRestoreOrCreateNew.create();

        this.sessionRestore = sessionRestore.create( {
            onPrevious: 'sessionRestoreOrCreate.client'
        } );

        this.spin.setMessage('loading');
        this.handleSpinner();

        sessionManager.loadSessionManager({ backend: backend });
    },

    handleSpinner: function ( e, args ) {
        this.setCurrentPrompt(this.spin, args);
    },

    handleSessionManagerLoad: function ( e, args ) {
        this.handleUserLoginOrCreate();
    },

    handleUserLoginOrCreate: function ( e, args ) {
        this.setCurrentPrompt(this.userLoginOrCreateNew, args);
    },

    handleUserLogin: function ( e, args ) {
        this.setCurrentPrompt(this.userLogin, args);
    },

    handleUserCreate: function ( e, args ) {
        this.setCurrentPrompt(this.userCreate, args);
    },

    handleUserCreateSubmit: function (e,args) {
        this.spin.setMessage('attempting to create user');

        this.handleSpinner();

        sessionManager.createNewUser(args.model);
    },

    // if this get called, @args is an object of type
    // _AuthenticationManagerResult whose .result field
    // contains a model of type UserCreatePendingConfirm
    handleAuthManagerUserCreated: function (e,args) {

        var successMessage = 'User successfully created. '              +
                             'A confirmation message has been sent to ' +
                             args.result.get('email');

        this.redirectFlash.setMainMessage( successMessage )
                          .setReturnMessage('return to login')
                          .flashbackTo('userLogin.client');

        this.setCurrentPrompt(this.redirectFlash);
    },

    // if this get called, @args is an object of type
    // _AuthenticationManagerResult whose .errorState field
    // contains a model of type UserCreateForm (e.g the orignal
    // model dealt with in the handleUserCreateSubmit method)
    handleAuthManagerUserCreateFailure: function (e,args) {

        this.redirectFlash.setMainMessage( _.first(args.errors) )
                          .setReturnMessage('return to user creation.')
                          .flashbackTo('userCreate.client')
                          .withState( { model: args.errorState } );

        this.setCurrentPrompt(this.redirectFlash);

    },

    handleUserLoginSubmit: function (e,args) {
        this.spin.setMessage('attempting to login user');

        this.handleSpinner();

        sessionManager.loginUser(args.model);
    },

    handleAuthManagerUserLogin: function (e,args) {
        this.currentUser = args.result;

        this.spin.setMessage('checking for existing sessions').renderMessageOnly();

        sessionManager.loadUserSessions( this.currentUser );
    },

    handleAuthManagerUserLoginFailure: function (e,args) {

        this.redirectFlash.setMainMessage( _.first(args.errors) )
                          .setReturnMessage('return to user login.')
                          .flashbackTo('userLogin.client')
                          .withState( { model: args.errorState } );

        this.setCurrentPrompt(this.redirectFlash);

    },

    handleUserSessionFetchSuccess: function (e,args) {
        this.sessionRestoreOrCreateNew.setModel(args.result);

        this.handleUserSessionRestoreOrCreateNew();
    },

    handleUserSessionFetchError: function (e,args) {
        console.log(args);
    },

    handleUserSessionRestoreOrCreateNew: function (e,args) {
        this.setCurrentPrompt(this.sessionRestoreOrCreateNew, args);
    },

    handleUserSessionRestore: function (e,args) {
        this.setCurrentPrompt(this.sessionRestore, args)
    },

    handleUserSessionCreate: function (e,args) {

    },

    handleUserSessionRestoreSubmit: function (e,args) {

    },

    handleUserSessionCreateSubmit: function (e,args) {

    }

});
exports.Client = _Client;