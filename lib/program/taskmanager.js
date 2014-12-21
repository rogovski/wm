var $ = require('jquery'),
    _ = require('underscore');

var handles = {};

function _registerHandle(programName, options) {
    if(_.isUndefined(programName))
        throw new Error('attempt made to register program with no name')

    if(_.isUndefined(options))
        throw new Error('attempt made to register program: '+programName+' with no options');

    if(_.isUndefined(options.create))
        throw new Error('program: '+programName+' with no create options');

    if(_.isUndefined(options.destroy))
        throw new Error('program: '+programName+' with no destroy options');

    handles[programName] = {};
    handles[programName].create = options.create;
    handles[programName].destroy = options.destroy;
}
exports.registerHandle = _registerHandle;


function _TaskManager() {
    this.sid = null;

    var sessionPid = 0;

    this.newPid = function () {
        sessionPid++;
        return sessionPid;
    };

    this.setSid = function ( sid ) {
        this.sid = sid;
        return this;
    };

    this.restoreProcesses = function ( procCollection ) {
        if(_.isNull(this.sid))
            throw new Error('task manager sid is null');

        var self = this;

        _.each( procCollection.models, function ( pm ) {
            var pid = pm.get('pid'),
                program = pm.get('program');

            // TODO: check if handles[program] is defined

            pm.set({ handle: handles[program].create(pid, self.sid) });

            if(pid > sessionPid) sessionPid = pid;
        } );
    };

    this.createProcess = function ( programName ) {

        // return new ProcessModel
    };

    this.destroyProcess = function ( processModel ) {

        return processModel;
    };

}

exports.TaskManager = _TaskManager;