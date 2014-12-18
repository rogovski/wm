// export all memory backends from this module

var authMem     = require('./memory/session/authentication.js'),
    manMem      = require('./memory/session/manager.js');

    //_           = require('underscore'),
    //authResult  = require('./session/authentication/result.js'),
    //manResult   = require('./session/manager/result.js'),


//exports.NewSessionManagerErrorResult = manResult.NewErrorResult;
//exports.NewSessionManagerSuccessResult = manResult.NewSuccessResult;
//exports.IsSessionManagerBackendResult = manResult.IsSessionManagerBackendResult;

exports.loadSessionManager = manMem.loadSessionManager

//exports.IsAuthenticationManagerBackendResult = authResult._IsAuthenticationManagerBackendResult;

exports.createNewUser = authMem.createNewUser;

exports.loginUser = authMem.loginUser;

exports.getAuthenticationState = authMem.getAuthenticationState;

exports.activatePendingUser = authMem.activatePendingUser;