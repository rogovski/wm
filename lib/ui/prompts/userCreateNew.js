var $              = require('jquery'),
    _              = require('underscore'),
    Backbone       = require('backbone'),
    previous       = require('../controls/previous.js'),
    user           = require('../../session/user.js');


var _UserCreateNew = previous.PreviousView.extend({

    template: JST['prompts/userCreateNew.html'],

    previous_events: {},

    initialize: function () {
        this.model = user.emptyUserCreateForm();

        Backbone.Validation.bind(this, {
            model: this.model
        });

        window.ucn = this;
    },

    render: function () {
        this.render_previous_with(this.template());

        this.center();

        this.delegateEvents();
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
    }

});


function _create ( options ) {
    return new _UserCreateNew( options );
}
exports.create = _create