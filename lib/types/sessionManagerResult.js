/**
 * the return result of all clients who
 * call a session manager function
 **/
function _SessionManagerResult() {
    this.hasErrors = false;
    this.errors    = null;
    this.result    = null;
}

/**
 * create a new session manager result
 * that represents an error
 **/
function _NewErrorResult( errors ) {
    var res = new _SessionManagerResult();

    res.hasErrors = true;
    res.errors = errors;

    return res;
}
exports.NewErrorResult = _NewErrorResult;

/**
 * create a new session manager result
 * that represents a Success
 **/
function _NewSuccessResult( result ) {
    var res = new _SessionManagerResult();

    res.result = result;

    return res;
}
exports.NewSuccessResult = _NewSuccessResult;

/**
 * check if a result object is a _SessionManagerResult
 * should be used by callers
 **/
function _IsSessionManagerResult( result ) {
    if(result instanceof _SessionManagerResult)
        return true;

    return false;
}
exports.IsSessionManagerResult = _IsSessionManagerResult;