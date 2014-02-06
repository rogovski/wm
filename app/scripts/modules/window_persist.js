
(function () {

	wmJs.AbstractPersistentBackend = function (options) {
	    this.config = options || {};

	    if(!_.isUndefined(this.initialize)){
	        this.initialize.apply(this, arguments);
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

	    if(_.isUndefined(this.remove_workspace)){
	        this.remove_workspace = function () {
	          throw new Error('AbstractPersistentBackend is abstract');
	        }
	    }
	};

	wmJs.PersistentBackend = (function () {
	    return {
	        extend: function (obj) {

	            var child = function (options) {
	              wmJs.AbstractPersistentBackend.apply(this, [options]);
	            };

	            _.extend(
	              child.prototype, 
	              wmJs.AbstractPersistentBackend.prototype, 
	              obj);

	            return child;
	        }
	    };
	})();		

})();