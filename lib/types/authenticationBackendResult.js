/**
 * result of making a call to any of the authentication manager backends.
 * this interface is the return result of EVERY authentication manager backend
 * weather its memory, serverside, etc
 **/


// the return result of all clients who
// call a authentication manager function
function _AuthenticationManagerBackendResult() {
    this.hasErrors = false;
    this.errors    = null;
    this.result    = null;
}

// create a new authentication manager result
// that represents a call to a particular
// backend that threw an error
function _NewErrorResult( errors ) {
    var res = new _AuthenticationManagerBackendResult();

    res.hasErrors = true;
    res.errors = errors;

    return res;
}
exports.NewErrorResult = _NewErrorResult;

// create a new authentication manager result
// that represents a Successfull call to
// a particular backend
function _NewSuccessResult( result ) {
    var res = new _AuthenticationManagerBackendResult();

    res.result = result;

    return res;
}
exports.NewSuccessResult = _NewSuccessResult;

// check if a result object is a _AuthenticationManagerBackendResult
// should be used by callers
function _IsAuthenticationManagerBackendResult( result ) {
    if(result instanceof _AuthenticationManagerBackendResult)
        return true;

    return false;
}
exports.IsAuthenticationManagerBackendResult = _IsAuthenticationManagerBackendResult;