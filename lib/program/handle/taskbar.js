var $              = require('jquery'),
    _              = require('underscore'),
    Backbone       = require('backbone');

/**
 * this object need to be aware of programs (both with instances
 * running in the procman and not) that are 'pinned' to it
**/
var _TaskbarView = Backbone.View.extend({

    attributes: {
        class: 'program-taskbar'
    },

    events: {

    },

    template: JST['program/handle/taskbar.html'],

    // there should be some idea of 'pinned' programs here.
    // eg windows taskbar functionallity


    render: function () {
        this.$el.html(this.template());
    },

    /**
     * set the session id of the process manager that launched
     * the task bar.
     **/
    setSessionInfo: function ( info ) {
        this.sid = info.sid;

        $.subscribe('launch.taskbar.'+this.sid, this.programLaunch.bind(this));
    },

    /**
     * fired when a new task item should be rendered to the taskbar
     **/
    programLaunch: function (e,args) {
        console.log(args);
    }



});
exports.TaskbarView = _TaskbarView;