Template.donutNav.events({
	'click .transition-link': function(e, template){
		e.preventDefault();
		var url = $(e.currentTarget).attr('href');

		if (url == window.location.pathname){
			return false;
		} else {

			$('.transition-link').removeClass('active');
			$(e.currentTarget).addClass('active');

			var options = Session.get('pageOptions');
			var animationType = options.animateOut;
			var page = $('.page');

			//close menu if it's open
			if (Session.get('shelfState') !== 'notActive'){
				donutStates.closeShelfState();
			}

			donutAnimation.findAnimation(options, animationType, page, url);
		}
	}
});