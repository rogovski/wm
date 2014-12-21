var $              = require('jquery'),
    _              = require('underscore'),
    Backbone       = require('backbone'),
    previous       = require('../controls/previous.js'),
    user           = require('../../types/userLoginForm.js');


var _UserLogin = previous.PreviousView.extend({

    template: JST['ui/prompts/userLogin.html'],

    previous_events: {
        'click .user-login-submit': 'handleUserLoginSubmit'

        // TODO: forgot username/password link
        // 'click .user-login-reset-creds': 'handleCredentialReset'
    },

    initialize: function () {
        this.model = user.emptyUserLoginForm();

        Backbone.Validation.bind(this, {
            model: this.model
        });
    },

    render: function () {
        this.render_previous_with(this.template());

        this.center();

        this.delegateEvents();
    },

    setPromptOptions: function ( options ) {
        if(_.isUndefined( options )) return;

        if(_.isUndefined( options.model )) return;

        this.model.set( options.model.attributes );
        this.loadView();
    },

    handleUserLoginSubmit: function () {

        this.loadModel();

        var validationResult = this.model.validate();

        if(this.model.isValid()) {
            $.publish('submit.userLogin.client', {
                model: this.model
            });
        }
        else {
            this.displayInvalid(validationResult);
        }
    },

    displayInvalid: function (validationResult) {
        console.log(validationResult);
    },

    /**
     * cycle through all input elements,
     * loading them into the model. assumes
     * input 'name' attribute is the same a
     * model attribute name
     **/
    loadModel: function () {
        var self = this;
        this.$el.find('input').each(function () {
            var $inp = $( this );
            self.model.set( $inp.prop('name'), $inp.val() );
        });
    },


    /**
     * load input elements from model values
     **/
    loadView: function () {
        var self = this;
        _.each(this.model.attributes, function (e,i) {
            self.$el.find('input[name="'+ i +'"]').val(e);
        });
    }

});


function _create ( options ) {
    return new _UserLogin( options );
}
exports.create = _create