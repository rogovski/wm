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

	wmJs.CssHooks.WindowFocus = (function () {
		var activeClass      = 'btn-default',
		    inactiveClass    = 'btn-link';

		return {
			activate: function ($context) {
                $context.css('z-index', 1)
                        .animate({'background-color': '#244'}, 500, 'easeInOutQuart'); 
			},
			deactivate: function ($context) {
                $context.css('z-index', 0)
                        .animate({'background-color': '#222'}, 500, 'easeInOutQuart');				
			},

		};		
	})();


	wmJs.CssHooks.minimize = function ($elem) {
		$elem.data('wmJsIsMinimized',true);
		$elem.removeClass(activeClass).addClass(inactiveClass);
	}
})();