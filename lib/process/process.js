var $                    = require('jquery'),
    _                    = require('underscore'),
    Backbone             = require('backbone'),
    Process              = require('../types/process.js');

Process.Process.prototype.setState = function ( state ) {

    var st = this.get('state');

    st.set({ status: state.status });

    if(!_.isEmpty(state.windowState)) {
        var wst = st.get('windowState');
        wst.set(state.windowState);
    }
};

