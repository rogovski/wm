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

// render windows from a previously inavtive session
ProcessManager.ProcessManager.prototype.renderWindowedHandles = function () {

    var procCollection   = this.get('processes'),
        sessionId        = this.get('sid'),
        self = this;

    _.each( procCollection.models, function (p) {
        var state = p.get('state'),
            pid   = p.get('pid'),
            handle = p.get('handle');

        if(state.get('status') == 'running' && state.get('windowState').get('hasWindowState')) {
            handle.run(null, {
                $windowEl: self.$rootEl
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
 * restore processes retrieved from a backend
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

        // TODO: handleState needs its own type
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


