(function () {
	'use strict';

	/**
	 * lookup single application by id
	 * TODO: out of bounds check
	 */
	wmJs.Util.getAppInfo = function (apps, id) {
		return _.filter(apps, function (e) {
			return e.id == id;
		})[0];
	};

	/**
	 * lookup single default workspace
	 * TODO: out of bounds check
	 */
	wmJs.Util.getDefaultWorkspace = function (workspaces) {
		return _.filter(workspaces, function (ws) {
			return ws.values.isDefault == true;
		})[0];
	};

	/**
	 * lookup all application instances with given application id
	 * TODO: out of bounds check
	 */
	wmJs.Util.getInstancesByApp = function (instances, appid) {
		return _.filter(instances, function (i) {
			return i.values.appId == appid;
		});
	};

	/**
	 * lookup all application instances with given workspace id
	 */
	wmJs.Util.getInstancesByWorkspace = function (instances, workspaceid) {
		return _.filter(instances, function (i) {
			return i.values.workspaceId == workspaceid;
		});
	};

	/**
	 * clone all objects in 'instances' list, additionally, 
	 * for each 'inst' in instances:
	 * 1) make sure inst.instance is set to null 
	 * 2) call clone on inst.state
	 */
	wmJs.Util.cloneInstanceList = function (instances) {
		var clonedInstances = [];

		_.each(instances, function (inst) {
			var clonedState = inst.values.state ? _.clone(inst.values.state) : {},
			    clonedInst = _.clone(inst);

			clonedInst.values.state = clonedState;
			clonedInst.instance = null;

			clonedInstances.push(clonedInst);
		});
		return clonedInstances;
	};

	/**
	 * 1) make sure inst.instance is set to null 
	 * 2) call clone on inst.state
	 * TODO: delete previous function, and use _.map at call site
	 */
	wmJs.Util.cloneInstance = function (instance) {

		var clonedState = instance.values.state ? _.clone(instance.values.state) : {},
		    clonedInst = _.clone(instance);

		clonedInst.values.state = clonedState;
		clonedInst.instance = null;

		return clonedInst;
	};

	/**
	 * find the instances that match newInit's workspace 
	 * and app id's (if exists). give it a similar position and offset
	 */
	wmJs.Util.tryTile = function (instances, newInit) {
		if(_.isUndefined(newInit.appId) || _.isUndefined(newInit.workspaceId)) return newInit;

		var similar = _.sortBy(_.filter(instances, function (i) {
			return i.values.appId == newInit.appId && i.values.appId == newInit.appId;
		}), function (i) { return -(Math.pow(i.values.top,2) + Math.pow(i.values.left, 2)); });
		
		if (similar.length > 0){
			newInit.width = similar[0].values.width;
			newInit.height = similar[0].values.height;
			newInit.top = similar[0].values.top + 50;
			newInit.left = similar[0].values.left + 50;
		}

		return newInit;
	};

	/**
	 * find the instances that are affixed 
	 * bring them over to the next workspace
	 */
	wmJs.Util.bringAffixedToWorkspace = function (instances, oldWorkspaceId, newWorkspaceId) {

		var currentWsList = wmJs.Util.getInstancesByWorkspace(instances, oldWorkspaceId),
			affixedLs = _.filter(currentWsList, function (e) { return !e.values.affixed; });

		_.each(affixedLs, function (e) { e.values.workspaceId = newWorkspaceId; });
	};	

})();