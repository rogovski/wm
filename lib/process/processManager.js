var $                    = require('jquery'),
    _                    = require('underscore'),
    Backbone             = require('backbone'),
    ProcessManager       = require('../types/processManager.js'),
    SessionManagerResult = require('../types/sessionManagerResult.js'),
    ProcCollectionExt    = require('./processCollection.js'),
    Program              = require('../program/programs.js');

ProcessManager.ProcessManager.prototype.setRootEl = function ( $rootEl ) {

    this.$rootEl = $rootEl;

    return this;
}

// render taskbar object
ProcessManager.ProcessManager.prototype.renderTaskbarHandle = function () {
    var taskbar          = Program.createTaskbarView(),
        sessionId        = this.get('sid');

    taskbar.setSessionInfo({sid: sessionId});

    this.$rootEl.append(taskbar.el);

    taskbar.render();
}

// render windows from a previously inactive session. called once after user
// logs in
ProcessManager.ProcessManager.prototype.renderWindowedHandles = function () {

    var procCollection   = this.get('processes'),
        sessionId        = this.get('sid'),
        self = this;

    this.renderTaskbarHandle();

    _.each( procCollection.models, function (p) {
        var state   = p.get('state'),
            pid     = p.get('pid'),
            handle  = p.get('handle'),
            program = p.get('program');

        if(state.get('status') == 'running' &&
                state.get('windowState').get('hasWindowState')) {

            handle.run(null, {
                $windowEl: self.$rootEl
            });

            // TODO: unified handle state. see elsewhere
            // this should look something like
            // $.publish('...', handle.state);
            $.publish('launch.taskbar.'+sessionId, {
                state  : state,
                pid    : pid,
                program: program
            });

        }

    } );

    return this;
}


ProcessManager.ProcessManager.prototype.lauch = function ( options ) {
    // use this.$rootEl if options.windowed is true
    if(_.isUndefined(options)) throw new Error('procman:launch - options is undef');


}


ProcessManager.ProcessManager.prototype.kill = function ( options ) {

}

/**
 * restore processes retrieved from a backend. called once after user logs in
 **/
ProcessManager.ProcessManager.prototype.restoreProcessesHandles = function () {

    var procCollection   = this.get('processes'),
        sessionId        = this.get('sid');

    // todo: check if sid is null, throw exeption "call fetch before calling this method"
    _.each( procCollection.models, function (p,i) {

        var pid         = p.get('pid'),
            parentPid   = p.get('parentPid'),
            program     = p.get('program'),
            state       = p.get('state');

        // TODO: handleState needs its own type, this way we can pass all
        // program information around in a unfied way to all 'system' programs
        // (e.g. the taskbar, fileexplorer)
        p.set({
            handle: Program
                        .handles[program]
                        .create(pid, parentPid, sessionId, state)
        });

    });

}

/**
 * options { user, activeSession, backend, success, error }
 **/
ProcessManager.ProcessManager.prototype.fetch = function ( options ) {

    var self = this;

    options.backend.loadUserSessionProcesses(

        options.user.toJSON(),

        options.activeSession.toJSON(),

        {
            success: function ( response ) {

                var procCollection   = self.get('processes'),
                    sessionId        = options.activeSession.get('sid');

                procCollection.fromRawResult( sessionId, response.result );

                self.set({ sid: sessionId });

                self.restoreProcessesHandles();

                options.success( SessionManagerResult.NewSuccessResult( self ) );
            },

            error: function ( response ) {

                options.error( SessionManagerResult.NewErrorResult( response.errors ) );

            }

        });

};


