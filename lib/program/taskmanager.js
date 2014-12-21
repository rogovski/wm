var $ = require('jquery'),
    _ = require('underscore');

var handles = {};

function _registerHandle(programName, options) {
    if(_.isUndefined(programName))
        throw new Error('attempt made to register program with no name')

    if(_.isUndefined(options))
        throw new Error('attempt made to register program: '+programName+' with no options');

    if(_.isUndefined(options.create))
        throw new Error('program: '+programName+' with no create options');

    if(_.isUndefined(options.destroy))
        throw new Error('program: '+programName+' with no destroy options');

    handles[programName] = {};
    handles[programName].create = create;
    handles[programName].destroy = destroy;
}
exports.registerHandle = _registerHandle;