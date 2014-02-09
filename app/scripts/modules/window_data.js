//wmJs.Data = wmJs.Data || {}

(function () {
	'use strict';

	/**
	 * represents a class of windowed applications
	 * every element in a collection of WindowedApplicationDefaults
	 * is unique
	 */
	var WindowedApplicationDefaults = {
		id: null,
		values: {
			display: 'blank window',
			factoryKey: 'blank_window',
			maxInstances: '*'			
		}
	};

	wmJs.Data.WindowedApplication = (function () {
		return {
			create: function ( existing_data ) {
				var existingData = existing_data || {},
				    defaults 	 = _.clone( WindowedApplicationDefaults ),
				    id           = typeof(existingData.id) == 'undefined' ? 
				    			   _.uniqueId( 'app' ) : existingData.id,
				    values       = _.extend( defaults.values, existingData, { } );

				return {id: id, values: values};
			}
		};
	})();

	/**
	 * represents an instance of a class of windowed applications
	 */
	var WindowedApplicationInstanceDefaults = {
		id: 		 null,
		values: {
			display:     'window',
			workspaceId: null,
			appId: 	     null,
			affixed: 	 false,
			draggable: 	 true,
			visible: 	 true,
			height: 	 200,
			width: 		 200,
			left: 		 50,
			top: 		 50,
			state: 		 {},
			instance:    null			
		}

	};

	wmJs.Data.WindowedApplicationInstance = (function () {
		return {
			create: function ( existing_data ) {
				var existingData = existing_data || {},
				    defaults 	 = _.clone( WindowedApplicationInstanceDefaults ),
				    id           = typeof( existingData.id ) == 'undefined' ? 
				    			   _.uniqueId( 'appInst' ) : existingData.id,
				    values       = _.extend( defaults.values, existingData, { } );

				return {id: id, values: values};
			}
		};
	})();

	/**
	 * represents an instance of a workspace
	 */
	var WorkspaceDefaults = {
		id: null,
		values: {
			display:'default',
			isDefault: false, 
			height: 2000, 
			width: 2000			
		}
	};

	wmJs.Data.Workspace = (function () {
		return {
			create: function ( existing_data ) {
				var existingData = existing_data || {},
				    defaults 	 = _.clone( WorkspaceDefaults ),
				    id           = typeof( existingData.id ) == 'undefined' ? 
				    			   _.uniqueId( 'workspace' ) : existingData.id,
				    values       = _.extend( defaults.values, existingData, { } );

				return {id: id, values: values};
			}
		};
	})();

})();

window.WM = window.WM || {}

/**
 * default window configuration
 */
window.WM.defaults = {
	id: 		null,
	state: 		{},
	factoryKey: 'blank_window',
	display: 	'blank window',
	affixed: 	false,
	draggable: 	true,
	visible: 	true,
	height: 	200,
	width: 		200,
	left: 		50,
	top: 		50
};

/**
 * creates and object which can be used as an
 * argument to WindowBlankView 
 */
window.WM.BlankWindowFactory = (function () {
	var ident = 0;

	return {
		mkWindow: function (options) {
			ident++;
			var config = options || {};
			return {
				id: 		ident,
				display: 	config.display || 'blank window',
				affixed: 	config.affixed || false,
				draggable: 	config.draggable || true,
				visible: 	config.visible || true,
				height: 	config.height || 200,
				width: 		config.width || 200,
				left: 		config.left || 50,
				top: 		config.top ||50,
				state: 		{},
				factoryKey: config.factoryKey || 'blank_window',
				instance: 	null				
			};
		}
	};
})(); 

/*
 * checks if all nesessary properties of config object
 * are present, if not, initialize with defaults
 */
window.WM.applyMissingConfig = function (config) {
	//config.data = _.extend(config.data, WM.defaults);

	config.id 			= config.id 		|| WM.defaults.id;
	config.state 		= config.state 		|| WM.defaults.state;
	config.display 		= config.display 	|| WM.defaults.display;
	config.affixed 		= config.affixed 	|| WM.defaults.affixed;
	config.draggable 	= config.draggable 	|| WM.defaults.draggable;
	config.visible 		= config.visible 	|| WM.defaults.visible;
	config.height 		= config.height 	|| WM.defaults.height;
	config.width 		= config.width 		|| WM.defaults.width;
	config.left 		= config.left 		|| WM.defaults.left;
	config.top 			= config.top 		|| WM.defaults.top;
};
 

window.WM.Exception = {}
window.WM.Exception.ConfigPropertyMissing = function (msg) {
	throw new Error('Configuration Property Missing: ' + msg)
};


window.WM.topics = {
	visibilityChanged: "visibilityChanged",
	workspaceChanged: "workspaceChanged",
	worspaceSaved: "workspaceSaved",
	viewInitialized: "viewInitialized",
	workspaceLoaded: "workspaceLoaded",
	workspaceWindowsLoaded: "workspaceWindowsLoaded",
	workspaceRenderAll: "workspaceRenderAll",
	windowConfigRequest: "windowConfigRequest"
};