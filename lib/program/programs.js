var taskmanager = require('./taskmanager.js');

require('./programs/helloworld.js');


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

function _newSessionTaskManager() {
    return new taskmanager.TaskManager();
}
exports.newSessionTaskManager = _newSessionTaskManager;