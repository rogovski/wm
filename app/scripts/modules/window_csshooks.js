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

	wmJs.CssHooks.WorkspaceSelect = (function () {
		var activeClass      = 'btn-default',
		    inactiveClass    = 'btn-link';

		return {
			/* top: 30, left: 125 */
			upperLeft: function () {
				$('.ws-selected-elt').animate({
					top: 30,
					left: 125,
				}, 200, 'easeInOutQuart')
			},
			isInUpperLeft: function () {
				var pos = $('.ws-selected-elt').position();
				if(pos.top == 30 && pos.left == 125) return true;
				else return false;
			},

			/* top: 30, left: 300*/
			upperRight: function () {
				$('.ws-selected-elt').animate({
					top: 30,
					left: 300,
				}, 200, 'easeInOutQuart')			
			},
			isInUpperRight: function () {
				var pos = $('.ws-selected-elt').position();
				if(pos.top == 30 && pos.left == 300) return true;
				else return false;
			},

			/* top: 205, left: 125*/
			lowerLeft: function () {
				$('.ws-selected-elt').animate({
					top: 205,
					left: 125,
				}, 200, 'easeInOutQuart')				
			},
			isInLowerLeft: function () {
				var pos = $('.ws-selected-elt').position();
				if(pos.top == 205 && pos.left == 125) return true;
				else return false;
			},

			/* top: 205, left: 300*/
			lowerRight: function () {
				$('.ws-selected-elt').animate({
					top: 205,
					left: 300,
				}, 200, 'easeInOutQuart')				
			},
			isInLowerRight: function () {
				var pos = $('.ws-selected-elt').position();
				if(pos.top == 205 && pos.left == 300) return true;
				else return false;
			}

		};				
	})();


	wmJs.CssHooks.minimize = function ($elem) {
		$elem.data('wmJsIsMinimized',true);
		$elem.removeClass(activeClass).addClass(inactiveClass);
	}
})();