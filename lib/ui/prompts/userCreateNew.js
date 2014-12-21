var $              = require('jquery'),
    _              = require('underscore'),
    Backbone       = require('backbone'),
    previous       = require('../controls/previous.js'),
    user           = require('../../types/userCreateForm.js');


var _UserCreateNew = previous.PreviousView.extend({

    template: JST['ui/prompts/userCreateNew.html'],

    previous_events: {
        'click .user-create-submit': 'handleUserCreateSubmit'
    },

    initialize: function () {
        this.model = user.emptyUserCreateForm();

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

    handleUserCreateSubmit: function () {

        this.loadModel();

        var validationResult = this.model.validate();

        if(this.model.isValid()) {
            $.publish('submit.userCreate.client', {
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
    return new _UserCreateNew( options );
}
exports.create = _create