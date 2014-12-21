var $                    = require('jquery'),
    _                    = require('underscore'),
    Backbone             = require('backbone'),
    ProcessManager       = require('../types/processManager.js'),
    SessionManagerResult = require('../types/sessionManagerResult.js'),
    Program              = require('../program/programs.js');



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
                var procCollection = self.get('processes'),

                    processModelList = _.map( response.result, function (p) {
                        var pmodel = new procCollection.model();

                        pmodel.set({ pid: p.pid, display: p.display, program: p.program });

                        return pmodel;
                    } );

                procCollection.reset( processModelList );

                self.set({ taskmanager: Program.newSessionTaskManager() });

                self.get('taskmanager').setSid(options.activeSession.get('sid'))
                                       .restoreProcesses(procCollection);

                options.success( SessionManagerResult.NewSuccessResult( self ) )
            },

            error: function ( response ) {

                options.error( SessionManagerResult.NewErrorResult( response.errors ) );

            }

        });

};