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
				    values       = _.extend( {}, defaults.values, existingData );

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
			left: 		 400,
			top: 		 50,
			state: 		 {}	
		}

	};

	wmJs.Data.WindowedApplicationInstance = (function () {
		return {
			create: function ( existing_data ) {
				var existingData = existing_data || {},
				    defaults 	 = _.clone( WindowedApplicationInstanceDefaults ),
				    id           = typeof( existingData.id ) == 'undefined' ? 
				    			   _.uniqueId( 'appInst' ) : existingData.id,
				    values       = _.extend( {}, defaults.values, existingData );

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
				    values       = _.extend( {}, defaults.values, existingData );

				return {id: id, values: values};
			}
		};
	})();


	wmJs.Data.Topics = {
		visibilityChanged: "visibilityChanged",
		workspaceChanged: "workspaceChanged",
		
		worspaceSaved: "workspaceSaved",
		viewInitialized: "viewInitialized",
		workspaceLoaded: "workspaceLoaded",
		workspaceWindowsLoaded: "workspaceWindowsLoaded",
		workspaceRenderAll: "workspaceRenderAll",
		windowConfigRequest: "windowConfigRequest",

		// request to persisitence layer for all applications
		applicationsRequest: 'applicationsRequest',

		// request to persistence layer for all workspaces
		workspacesRequest: 'workspacesRequest',

		// request to persistence layer to get all application instances
		applicationInstancesRequest: 'applicationInstancesRequest',


		// reaponse from persisitence layer giving all applications
		applicationsResponse: 'applicationsResponse',

		// response from persistence layer giving all workspaces
		workspacesResponse: 'workspacesResponse',

		// response from persistence layer giving all application instances
		applicationInstancesResponse: 'applicationInstancesResponse',

		currentWorkspaceRequest: 'currentWorkspaceRequest',
		currentWorkspaceResponse: 'currentWorkspaceResponse',

		windowMinimizedNotification: 'windowMinimizedNotification',
		windowMaximizedNotification: 'windowMaximizedNotification',

		appInstancePersistCreated: 'appInstancePersistCreated',
		requestAppInstanceCreation: 'requestAppInstanceCreation',


		workspaceSaveNotifyPersistanceLayer: 'workspaceSaveNotifyPersistanceLayer',
		requestSaveFromPersistanceLayer: 'requestSaveFromPersistanceLayer',


		//app instance focusing
		appInstanceFocusChanged: 'appInstanceFocusChanged',

		//request from instance to close itself
		instanceRequestDeallocation:'instanceRequestDeallocation',

		persistHandleInstanceDeallocation:'persistHandleInstanceDeallocation',
		persistInstanceDeallocationHandled:'persistInstanceDeallocationHandled',

		logMessage: 'logMessage'

	};

})();
