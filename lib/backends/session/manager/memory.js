var result = require('./result.js');

// data store of sessions
var sessions = [
    { name: 'session1' }
];


/**
 * options :: { success :: Function, error: Function }
 **/
function _loadSessionManager(options) {
    setTimeout(function () {
        options.success( result.NewSuccessResult( sessions ) );
    }, 1000);
}
exports.loadSessionManager = _loadSessionManager;