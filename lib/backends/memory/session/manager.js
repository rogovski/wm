var result       = require('../../../types/sessionManagerBackendResult.js'),
    managerInfo  = require('../data/managerInfo.js'),
    _            = require('underscore');


/**
 * options :: { success :: Function, error: Function }
 **/
function _loadSessionManager(options) {
    setTimeout(function () {
        options.success( result.NewSuccessResult( managerInfo.managerInfo ) );
    }, 1000);
}
exports.loadSessionManager = _loadSessionManager;