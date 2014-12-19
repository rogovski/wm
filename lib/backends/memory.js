// export all memory backends from this module

var authMem     = require('./memory/session/authentication.js'),
    manMem      = require('./memory/session/manager.js');

exports.loadSessionManager = manMem.loadSessionManager;

exports.loadUserSessions = manMem.loadUserSessions;

exports.createNewUser = authMem.createNewUser;

exports.loginUser = authMem.loginUser;

exports.getAuthenticationState = authMem.getAuthenticationState;

exports.activatePendingUser = authMem.activatePendingUser;