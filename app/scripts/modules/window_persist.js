
(function () {

	wmJs.Persistence.AbstractPersistentBackend = function (options) {
	    this.config = options || {};

	    this.registerSubstriptions = function () {
	    	$.subscribe(wmJs.Data.Topics.applicationsRequest,
	    				_.partial(this.get_all_applications,this));

	    	$.subscribe(wmJs.Data.Topics.applicationInstancesRequest,
	    				_.partial(this.get_all_windows,this));

	    	$.subscribe(wmJs.Data.Topics.workspacesRequest,
	    				_.partial(this.get_all_workspaces,this));

	    	$.subscribe(wmJs.Data.Topics.requestAppInstanceCreation,
	    				_.partial(this.create_window, this));
	    };	
	     
	    if(!_.isUndefined(this.initialize)){
	        this.initialize.apply(this, arguments);
	        this.registerSubstriptions();
	    }

	    if(_.isUndefined(this.set_window)){
	        this.set_window = function () {
	          throw new Error('AbstractPersistentBackend is abstract');
	        }
	    }

	    if(_.isUndefined(this.get_window)){
	        this.get_window = function () {
	          throw new Error('AbstractPersistentBackend is abstract');
	        }
	    }

	    if(_.isUndefined(this.get_all_windows)){
	        this.get_all_windows = function () {
	          throw new Error('AbstractPersistentBackend is abstract');
	        }
	    }

	    if(_.isUndefined(this.remove_window)){
	        this.remove_window = function () {
	          throw new Error('AbstractPersistentBackend is abstract');
	        }
	    }

	    if(_.isUndefined(this.set_workspace)){
	        this.set_workspace = function () {
	          throw new Error('AbstractPersistentBackend is abstract');
	        }
	    }

	    if(_.isUndefined(this.get_workspace)){
	        this.get_workspace = function () {
	          throw new Error('AbstractPersistentBackend is abstract');
	        }
	    }

	    if(_.isUndefined(this.get_workspaces)){
	        this.get_all_workspaces = function () {
	          throw new Error('AbstractPersistentBackend is abstract');
	        }
	    }

	    if(_.isUndefined(this.remove_workspace)){
	        this.remove_workspace = function () {
	          throw new Error('AbstractPersistentBackend is abstract');
	        }
	    }

	    if(_.isUndefined(this.get_applications)){
	        this.get_applications = function () {
	          throw new Error('AbstractPersistentBackend is abstract');
	        }
	    }
   
	};

	wmJs.Persistence.PersistentBackend = (function () {
	    return {
	        extend: function (obj) {

	            var child = function (options) {
	              wmJs.Persistence.AbstractPersistentBackend.apply(this, [options]);
	            };

	            _.extend(
	              child.prototype, 
	              wmJs.Persistence.AbstractPersistentBackend.prototype, 
	              obj);

	            return child;
	        }
	    };
	})();		

})();