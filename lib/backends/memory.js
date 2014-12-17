// export all memory backends from this module

var _           = require('underscore'),
    authResult  = require('./session/authentication/result.js'),
    authMem     = require('./session/authentication/memory.js'),
    manResult   = require('./session/manager/result.js'),
    manMem      = require('./session/manager/memory.js');


exports.NewSessionManagerErrorResult = manResult.NewErrorResult;

exports.NewSessionManagerSuccessResult = manResult.NewSuccessResult;

exports.IsSessionManagerBackendResult = manResult.IsSessionManagerBackendResult;

exports.loadSessionManager = manMem.loadSessionManager

exports.IsAuthenticationManagerBackendResult = authResult._IsAuthenticationManagerBackendResult;

exports.createNewUser = authMem.createNewUser;

exports.loginUser = authMem.loginUser;

exports.getAuthenticationState = authMem.getAuthenticationState;

exports.activatePendingUser = authMem.activatePendingUser;