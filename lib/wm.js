'use strict';

/**
 * statscript.js factory function.
 */
function create (config) {
    // simple test for ES5 support
    if (typeof Object.create !== 'function') {
      throw new Error('ES5 not supported by this JavaScript engine. ' +
          'Please load the es5-shim and es5-sham library for compatibility.');
    }

    // create namespace
    var wm = {};

    wm.create = create;

    // JQUERY
    //////////////////////////////////////////////////////
    wm.$ = require('jquery');

    // the following are loaded into jquery
    require('jquery-ui');
    require('./utility/spin.jquery.js');
    require('./utility/pubsub.js');
    require('./utility/tooltip.js');
    require('./utility/popover.js');
    require('./utility/perfect-scrollbar.js');


    // UNDERSCORE - BACKBONE
    //////////////////////////////////////////////////////
    wm._        = require('underscore');
    wm.Backbone = require('backbone');
    wm.Validate = require('./utility/validation');

    // extend backbone models with validation plugin
    // this way models can call .validate() directly
    wm._.extend(wm.Backbone.Model.prototype, wm.Validate.mixin);


    // CORE
    //////////////////////////////////////////////////////
    wm.session         = {};
    wm.session.manager = require('./session/sessionManager.js');

    wm.backend        = {};
    wm.backend.memory = require('./backends/memory.js');

    wm.ui        = {};
    wm.ui.client = require('./ui/client.js');

    // return the new instance
    return wm;
}

// create a default instance of math.js
var wm = create();

// export the default instance
module.exports = wm;

// nodemon --exec "rebuild.bat" .\rebuild.bat
