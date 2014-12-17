var result = require('./result.js');

// data store of sessions
var sessions = [
    { name: 'session1' }
];

var managerInfo = {
    type: 'memory'
};


/**
 * options :: { success :: Function, error: Function }
 **/
function _loadSessionManager(options) {
    setTimeout(function () {
        options.success( result.NewSuccessResult( managerInfo ) );
    }, 1000);
}
exports.loadSessionManager = _loadSessionManager;