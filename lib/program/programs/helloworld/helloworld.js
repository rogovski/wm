var $          = require('jquery'),
    _          = require('underscore'),
    taskmanager = require('../../taskmanager/taskmanager.js');

var commands = {
    run: function (pid, sid) {
        return 'run.helloworld.'+pid+'.'+sid;
    },

    help: function (pid, sid) {
        return 'help.helloworld.'+pid+'.'+sid;
    }
};

function _HelloWorldHandle (pid, sid) {

    this.commands = [];

    this.run = function (e,args) {
        args.success('hello world');
    };

    this.help = function (e,args) {
        args.success(this.commands);
    };

    var self = this;

    _.each(commands, function (fn,name) {
        var command = fn(pid, sid);
        self.commands.push(name);
        $.subscribe(command, self[name].bind(self));
    });
}

function createHandle (pid, sid) {
    return new _HelloWorldHandle(pid, sid);
}

function destroyHandle (handle) {
    _.each(handle.commands, function (c) {
        $.unsubscribe(c);
    });

    return handle;
}

taskmanager.registerHandle('helloworld', {
    create: createHandle,
    destroy: destroyHandle
})