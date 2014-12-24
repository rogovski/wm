// note: should probably rename the parent directory 'query'
var result       = require('../../../types/sessionManagerBackendResult.js'),
    managerInfo  = require('../data/managerInfo.js'),
    session      = require('../data/session.js'),
    process      = require('../data/process.js'),
    processState = require('../data/processState.js'),
    user         = require('../data/user.js'),
    _            = require('underscore');


// user is a param here for authentication purposes
function _loadUserSessionProcesses(rawJsonUser, rawJsonActiveSession, options) {

    setTimeout(function () {

        var procs = _.where(process.process, { sid: rawJsonActiveSession.sid });

        if(procs.length == 0) {
            options.error( result.NewErrorResult( ["membackend: proc id lookup"] ) );
            return;
        }

        var queryResult = [];

        _.each(procs, function (p) {
            var state = _.findWhere(processState.processState, { pid: p.pid });
            queryResult.push(_.extend({}, p, {
                state: {
                    status: state.status,
                    windowState: state.windowState
                }
            }));
        });

        options.success( result.NewSuccessResult( queryResult ) );
    }, 1000);

}
exports.loadUserSessionProcesses = _loadUserSessionProcesses;