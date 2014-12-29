var $              = require('jquery'),
    _              = require('underscore'),
    Backbone       = require('backbone');


/**
 * three distinct usecases i can think of for this object
 *
 * - the object could be instantiated without a corresponding
 *   process that is running in the process manager. it serves
 *   as a ui entry point for the user to lauch a program (think
 *   of any window manager where you might not have any instance of
 *   a text editor running, but in the taskbar you see an icon that
 *   allows you to launch a new instance of that editor)
 *
 * - the object corresponds to one instance of a process
 *   running in the process mananger.
 *
 * - there are many instances of the same program running in the
 *   process manager. this object needs to reflect that (perhaps with
 *   a little number in the corner)
 *
 **/

var _TaskbarItemView = Backbone.View.extend({

    attributes: {
        class: 'program-taskbar-item'
    },

    events: {

    },

    template: JST['program/handle/taskbarItem.html'],

    render: function () {
        this.$el.html(this.template());
    },


    setSessionProcessInfo: function ( info ) {


    },


    programLaunch: function (e,args) {
        console.log(args);
    }



});
exports.TaskbarItemView = _TaskbarItemView;