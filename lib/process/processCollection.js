var $                    = require('jquery'),
    _                    = require('underscore'),
    Backbone             = require('backbone'),
    ProcessCollection    = require('../types/processCollection.js'),
    Process              = require('../types/process.js'),
    ProcessExt           = require('./process.js'),
    ProcessState         = require('../types/processState.js'),
    ProcessStateOpts     = require('./processState.js');

ProcessCollection.ProcessCollection.prototype.fromRawResult = function ( sessionId, result ) {

    var self = this,
        procModelCollection = _.map( result, function (p) {
            var pmodel = new self.model();

            var state = new ProcessState.ProcessState({
                status: p.state.status,
                windowState: _.isEmpty(p.state.windowState) ?
                    ProcessStateOpts.emptyProcessWindow() :
                    ProcessStateOpts.processWindowInfo( p.state.windowState )
            });

            pmodel.set({
                pid      : p.pid,
                parentPid: p.parentPid,
                sid      : sessionId,
                display  : p.display,
                program  : p.program,
                state: state
            });

            return pmodel;
        });

    this.reset( procModelCollection );

};

