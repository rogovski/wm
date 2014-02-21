$(function () {
	if(!store.enabled) {
		$('#localStorageLink img').attr('src', 'app/scripts/vendor/css/images/thumbsdownicon.png');
		$('#localStorageLink').css('background-color','rgb(200, 154, 136)')
							  .attr('data-toggle','tooltip')
							  .attr('data-placement','right')
							  .attr('title','your browser doesn\'t support localstorage')
							  .click(function (e) {
								  e.preventDefault();
							  });

	}
});