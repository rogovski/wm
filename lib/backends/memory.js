// export all memory backends from this module

var authMem     = require('./memory/query/authentication.js'),
    manMem      = require('./memory/query/manager.js'),
    procMem     = require('./memory/query/process.js');

exports.loadSessionManager = manMem.loadSessionManager;

exports.loadUserSessions = manMem.loadUserSessions;

exports.createNewUser = authMem.createNewUser;

exports.loginUser = authMem.loginUser;

exports.getAuthenticationState = authMem.getAuthenticationState;

exports.activatePendingUser = authMem.activatePendingUser;

exports.loadUserSessionProcesses = procMem.loadUserSessionProcesses