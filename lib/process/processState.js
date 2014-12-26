var $                    = require('jquery'),
    _                    = require('underscore'),
    Backbone             = require('backbone'),
    ProcessState         = require('../types/processState.js'),
    ProcessStateWindow   = require('../types/processStateWindow.js');

function _emptyProcessWindow() {
    return new ProcessStateWindow.ProcessStateWindow({ hasWindowState: false });
}
exports.emptyProcessWindow = _emptyProcessWindow;

function _processWindowInfo( info ) {
    return new ProcessStateWindow.ProcessStateWindow({
        hasWindowState: true,
        height: info.height,
        width: info.width,
        top: info.top,
        left: info.left
    });
}
exports.processWindowInfo = _processWindowInfo;