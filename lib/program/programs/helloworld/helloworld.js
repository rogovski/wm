var $          = require('jquery'),
    _          = require('underscore');

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

    this.window = null;

    this.run = function (e,args) {
        //args.windowed :: bool
        //args.callingProc :: int
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
exports.create = createHandle;


function destroyHandle (handle) {
    _.each(handle.commands, function (c) {
        $.unsubscribe(c);
    });

    return handle;
}
exports.destroy = destroyHandle;


exports.name = 'helloworld';

