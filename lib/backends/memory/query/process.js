// note: should probably rename the parent directory 'query'
var result       = require('../../../types/sessionManagerBackendResult.js'),
    managerInfo  = require('../data/managerInfo.js'),
    session      = require('../data/session.js'),
    process      = require('../data/process.js'),
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

        options.success( result.NewSuccessResult( procs ) );
    }, 1000);

}
exports.loadUserSessionProcesses = _loadUserSessionProcesses;