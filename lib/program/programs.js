var taskbar    = require('./handle/taskbar.js'),
    helloworld = require('./programs/helloworld/helloworld.js');


function _createTaskbarView() {
    return new taskbar.TaskbarView();
}
exports.createTaskbarView = _createTaskbarView;


var handles = {};

handles[helloworld.name] = {
    create: helloworld.create,
    destroy: helloworld.destroy
};

exports.handles = handles;


// a program has the following states
// not loaded:
//   e.g. not associated with a process
// loaded but not executing
//   the program is in the list of processes for a session.
//   its handle is initialized.
//   it is not running
// executing
//   the program is in the list of processes for a session.
//   its handle is initialized.
//   it is running
// finished
//   the program is in the list of processes for a session.
//   its handle is initialized.
//   it has run and completed

