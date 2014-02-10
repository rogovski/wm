(function () {
	'use strict';
	
	wmJs.Exception = {}

	wmJs.Exception.ConfigPropertyMissing = function (msg) {
		throw new Error('Configuration Property Missing: ' + msg)
	};	

})();