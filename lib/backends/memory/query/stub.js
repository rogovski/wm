var $                    = require('jquery'),
    _                    = require('underscore'),
    Backbone             = require('backbone'),
    uss                  = require('../../../types/userSessionState.js'),
    u                    = require('../../../types/user.js'),
    sc                    = require('../../../types/sessionCollection.js'),
    s                    = require('../../../types/session.js'),

    hw                    = require('../../../program/programs.js'),
    pc                    = require('../../../types/processCollection.js'),
    p                   = require('../../../types/process.js'),
    pm                    = require('../../../types/processManager.js'),
    ps                    = require('../../../types/processState.js'),
    p2                    = require('../../../process/processState.js'),

    ProcessCollection    = require('../../../types/processCollection.js');


exports.timeout = 1000;

var coll = new sc.SessionCollection();
coll.add(new s.Session({ sid: 0 }));

exports.ussStub =
new uss.UserSessionState({
    activeSessionIdx: 0,
    user: new u.User({email: "admin@wm.js",token: "tok1",username: "admin"}),
    sessions: coll
   });
