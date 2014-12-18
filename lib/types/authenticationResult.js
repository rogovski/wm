var _        = require('underscore'),
    Backbone = require('backbone');

// need an AuthResult Object
// the return result of all clients who
// call a authentication manager function
function _AuthenticationManagerResult() {

    this.hasErrors   = false;
    this.errors      = null;
    this.errorState  = null;
    this.result      = null;
}

// create a new authentication manager result
// that represents an error
function _NewErrorResult( errors, state ) {
    var res = new _AuthenticationManagerResult();

    res.hasErrors = true;
    res.errors = errors;

    if(!_.isUndefined(state)) res.errorState = state;

    return res;
}
exports.NewErrorResult = _NewErrorResult;

// create a new authentication manager result
// that represents a Success
function _NewSuccessResult( result ) {
    var res = new _AuthenticationManagerResult();

    res.result = result;

    return res;
}
exports.NewSuccessResult = _NewSuccessResult

// check if a result object is a _AuthenticationManagerResult
// should be used by callers
function _IsAuthenticationManagerResult( result ) {
    if(result instanceof _AuthenticationManagerResult)
        return true;

    return false;
}
exports.IsAuthenticationManagerResult = _IsAuthenticationManagerResult;