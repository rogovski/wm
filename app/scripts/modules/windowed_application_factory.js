window.WM = window.WM || {}

/**
 * abstract factory for creating windowed applications
 * classes which don't implement inherit from ApplicationWindow
 * and dont implement a 'window_render' method are ignored
 */
window.WM.WindowedApplicationFactory = (function () {
 
    // Storage for WindowedApplication types
    var types = {};
 
    return {

        /**
         * lookup type by name
         * @param {string} type -the lookup name of the object
         * @param {function} properties -the constructor's arguments         
         */
        getWindowedApplication: function ( type, properties ) {
            var WindowedApplication = types[type];
 
            return (WindowedApplication ? new WindowedApplication(properties) : null);
        },
 
        /**
         * register a constructor with the factory
         * @param {string} type -the lookup name of the object
         * @param {function} WindowedApplication -the object's constructor
         */
        registerApplication: function ( type, WindowedApplication ) {
            var proto = WindowedApplication.prototype;
 
            // only register classes that fulfill the contract
            if ( proto.window_render && proto.windowTemplate ) {
                types[type] = WindowedApplication;
            }
 
            return WM.WindowedApplicationFactory;
        }
    };
})();