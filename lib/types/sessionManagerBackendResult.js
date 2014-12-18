/**
 * result of making a call to any of the session manager backends.
 * this interface is the return result of EVERY session manager backend
 * weather its memory, serverside, etc
 **/


// the return result of all clients who
// call a session manager function
function _SessionManagerBackendResult() {
    this.hasErrors = false;
    this.errors    = null;
    this.result    = null;
}

// create a new session manager result
// that represents a call to a particular
// backend that threw an error
function _NewErrorResult( errors ) {
    var res = new _SessionManagerBackendResult();

    res.hasErrors = true;
    res.errors = errors;

    return res;
}
exports.NewErrorResult = _NewErrorResult;

// create a new session manager result
// that represents a Successfull call to
// a particular backend
function _NewSuccessResult( result ) {
    var res = new _SessionManagerBackendResult();

    res.result = result;

    return res;
}
exports.NewSuccessResult = _NewSuccessResult;

// check if a result object is a _SessionManagerBackendResult
// should be used by callers
function _IsSessionManagerBackendResult( result ) {
    if(result instanceof _SessionManagerBackendResult)
        return true;

    return false;
}
exports.IsSessionManagerBackendResult = _IsSessionManagerBackendResult;