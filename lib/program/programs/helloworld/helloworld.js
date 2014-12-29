var $                = require('jquery'),
    _                = require('underscore'),
    HelloWorldWindow = require('./helloworldWindow.js');

var commands = {
    run: function (pid, sid) {
        return 'run.helloworld.'+pid+'.'+sid;
    },

    help: function (pid, sid) {
        return 'help.helloworld.'+pid+'.'+sid;
    }
};


var _name = 'helloworld';
exports.name = _name;


function _HelloWorldHandle (pid, parentPid, sid, state) {

    this.commands = [];

    this.windowObj = null;

    this.state = state;

    this.pid = pid;

    this.parentPid = parentPid;

    this.sid = sid;

    var self = this;

    _.each(commands, function (fn,name) {
        var command = fn(pid, sid);
        self.commands.push(name);
        $.subscribe(command, self[name].bind(self));
    });
}

_HelloWorldHandle.prototype.run = function (e,args) {
    if(_.isUndefined(args)) throw new Error('helloworld: args undefined');

    if(!_.isUndefined(args.$windowEl)) {

        if(this.windowObj == null) {
            this.windowObj = new HelloWorldWindow.HelloWorldWindow();
        }

        this.windowObj.$el.hide();

        // TODO: handle state needs own type
        this.windowObj.setWindowState(this.state.get('windowState'))
                      .setProcessInfo({pid: this.pid, parentPid: this.parentPid, sid: this.sid})
                      .applyWindowState()
                      .applyProcessInfo();

        args.$windowEl.append(this.windowObj.el);
        this.windowObj.render();

        this.windowObj.show()

        return;
    }

    args.success('hello world');
}

_HelloWorldHandle.prototype.help = function (e,args) {
    args.success(this.commands);
};

function createHandle (pid, parentPid, sid, state) {

    return new _HelloWorldHandle(pid, parentPid, sid, state);
}
exports.create = createHandle;


function destroyHandle (handle) {

    _.each(handle.commands, function (c) {
        $.unsubscribe(c);
    });

    return handle;
}
exports.destroy = destroyHandle;




