var $                    = require('jquery'),
    _                    = require('underscore'),
    Backbone             = require('backbone'),
    ProcessCollection    = require('../types/processCollection.js'),
    ProcessExt    = require('./process.js');

ProcessCollection.ProcessCollection.prototype.fromRawResult = function ( sessionId, result ) {

    var self = this,
        processModelList = _.map( result, function (p) {

        var pmodel = new self.model();

        pmodel.set({
            pid      : p.pid,
            parentPid: p.parentPid,
            sid      : sessionId,
            display  : p.display,
            program  : p.program
        });

        pmodel.setState( p.state );

        return pmodel;
    } );

    self.reset( processModelList );
};

