var result = require('./result.js'),
    _      = require('underscore');


var users = [
    { username: 'admin', password: 'pass', email: 'admin@wm.js', token: 'tok1'},
    { username: 'joe', password: 'word', email: 'joe@wm.js', token: 'tok2'}
];


function _createNewUser( rawCreateUserForm, options ) {
    setTimeout(function () {

        var rawJsonNewUser = {
            username: rawCreateUserForm.username,
            password: rawCreateUserForm.password,
            email: rawCreateUserForm.email,
            token: 'tok'+_.uniqueId()
        };

        // TODO: if user exists, return error

        users.push(rawJsonNewUser);

        options.success( result.NewSuccessResult( {
            username: rawJsonNewUser.username,
            email: rawJsonNewUser.email,
            token: rawJsonNewUser.token
        } ) );

    }, 1000);
}
exports.createNewUser = _createNewUser;