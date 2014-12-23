(function() {(window["JST"] = window["JST"] || {})["ui/client.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["ui/prompts/flashback.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="option-row">\r\n    <div class="flashback-message-content"></div>\r\n</div>\r\n\r\n<div class="option-sep"></div>\r\n\r\n<div class="option-row">\r\n\r\n    ';
 if(hasReturnButton) { ;
__p += '\r\n        <a class="flashback-return-message" href="#">return</a>\r\n    ';
 } ;
__p += '\r\n\r\n    ';
 if(hasCountdown) { ;
__p += '\r\n        <div class="flashback-countdown-message">\r\n            <span>&nbsp;Redirect in ' +
((__t = ( countdown )) == null ? '' : __t) +
' seconds.</span>\r\n        </div>\r\n    ';
 } ;
__p += '\r\n\r\n</div>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["ui/prompts/sessionRestore.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\r\n<div class="option-row">\r\n    <div class="user-session-list-container"></div>\r\n</div>\r\n\r\n<div class="option-sep"></div>\r\n\r\n<div class="option-row">\r\n    <button class="btn btn-info user-session-restore-submit">OK</button>\r\n</div>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["ui/prompts/sessionRestoreOrCreateNew.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 if(hasExistingSessions) { ;
__p += '\r\n    <div class="option-row">\r\n        <a href="#" class="btn btn-info btn-session-restore">RESTORE SESSION</a>\r\n    </div>\r\n\r\n    <div class="option-sep"></div>\r\n';
 } ;
__p += '\r\n\r\n\r\n<div class="option-row">\r\n    <a href="#" class="btn btn-info btn-session-create">CREATE NEW SESSION</a>\r\n</div>\r\n';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["ui/prompts/spinner.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="option-row">\r\n    <div class="spinner-container"></div>\r\n</div>\r\n\r\n<div class="option-sep"></div>\r\n\r\n<div class="option-row">\r\n    <h3 class="spinner-message"></h3>\r\n</div>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["ui/prompts/userCreateNew.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\r\n\r\n<div class="option-row">\r\n    <input type="text" name="username" class="form-control user-create-name" placeholder="Enter Username">\r\n</div>\r\n\r\n<div class="option-sep"></div>\r\n\r\n<div class="option-row">\r\n    <input type="text" name="email" class="form-control user-create-email" placeholder="Enter Email">\r\n</div>\r\n\r\n<div class="option-sep"></div>\r\n\r\n<div class="option-row">\r\n    <input type="password" name="password" class="form-control user-create-passwd" placeholder="Enter Password">\r\n</div>\r\n\r\n<div class="option-sep"></div>\r\n\r\n<div class="option-row">\r\n    <input type="password" name="passrep" class="form-control user-create-passwd-repeat" placeholder="Re-Enter Password">\r\n</div>\r\n\r\n<div class="option-sep"></div>\r\n\r\n<div class="option-row">\r\n    <button class="btn btn-info user-create-submit">OK</button>\r\n</div>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["ui/prompts/userLogin.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\r\n\r\n<div class="option-row">\r\n    <input type="text" name="username" class="form-control user-login-name" placeholder="Enter Username">\r\n</div>\r\n\r\n<div class="option-sep"></div>\r\n\r\n<div class="option-row">\r\n    <input type="password" name="password" class="form-control user-login-passwd" placeholder="Enter Password">\r\n</div>\r\n\r\n<div class="option-sep"></div>\r\n\r\n<div class="option-row">\r\n    <button class="btn btn-info user-login-submit">OK</button>\r\n</div>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["ui/prompts/userLoginOrCreateNew.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="option-row">\r\n    <a href="#" class="btn btn-info btn-user-login">USER LOGIN</a>\r\n</div>\r\n\r\n<div class="option-sep"></div>\r\n\r\n<div class="option-row">\r\n    <a href="#" class="btn btn-info btn-user-create">CREATE NEW USER</a>\r\n</div>\r\n';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["ui/controls/listbox.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<ul class="control-listbox-container"></ul>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["ui/controls/listboxItem.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<span>' +
((__t = ( display )) == null ? '' : __t) +
'</span>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["ui/controls/previous.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\r\n<div class="previous-button-container">\r\n    <a href="#" class="btn-previous"><i class="fa fa-arrow-circle-left fa-3x"></i></a>\r\n</div>\r\n\r\n<div class="promp-content control-previous-content-container">\r\n\r\n</div>';

}
return __p
}})();
(function() {(window["JST"] = window["JST"] || {})["ui/controls/prompt.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="prompt-content"></div>';

}
return __p
}})();