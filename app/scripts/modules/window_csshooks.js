(function () {
	'use strict';



	wmJs.CssHooks.LauncherInstance = (function () {
		var activeClass      = 'btn-default',
		    inactiveClass    = 'btn-link';

		return {
			minimize: function ($context, id) {
				var $btnMinimize = $context.find('.'+id+'.lbtn-min'),
				    $btnMaximize = $context.find('.'+id+'.lbtn-max');
				$btnMinimize.removeClass(inactiveClass).addClass(activeClass);
				$btnMaximize.removeClass(activeClass).addClass(inactiveClass);
			},
			maximize: function ($context, id) {
				var $btnMinimize = $context.find('.'+id+'.lbtn-min'),
				    $btnMaximize = $context.find('.'+id+'.lbtn-max');
				$btnMaximize.removeClass(inactiveClass).addClass(activeClass);
				$btnMinimize.removeClass(activeClass).addClass(inactiveClass);
			},

		};		
	})();
	wmJs.CssHooks.minimize = function ($elem) {
		$elem.data('wmJsIsMinimized',true);
		$elem.removeClass(activeClass).addClass(inactiveClass);
	}
})();