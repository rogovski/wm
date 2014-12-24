var $                    = require('jquery'),
    _                    = require('underscore'),
    Backbone             = require('backbone'),
    ProcessManager       = require('../types/processManager.js'),
    SessionManagerResult = require('../types/sessionManagerResult.js'),
    ProcCollectionExt    = require('./processCollection.js'),
    Program              = require('../program/programs.js');

/**
 * restore processes retrieved from a backend
 **/
ProcessManager.ProcessManager.prototype.restoreProcessesHandles = function () {
    var procCollection   = this.get('processes'),
        sessionId        = this.get('sid');

    // todo: check if sid is null, throw exeption "call fetch before calling this method"
    _.each( procCollection.models, function (p,i) {
        var pid = p.get('pid'),
            program = p.get('program');

        p.set({ handle: Program.handles[program].create(pid, sessionId) });
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


ProcessManager.ProcessManager.prototype.setRootEl = function ( options ) {
    //options.$rootEl
}


ProcessManager.ProcessManager.prototype.lauch = function ( options ) {
    // use this.$rootEl if options.windowed is true
}


ProcessManager.ProcessManager.prototype.kill = function ( options ) {

}