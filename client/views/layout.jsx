Template.layout.onRendered(function(){
	if (Meteor.userId()){
		Session.set('loggedIn', true); 
	} else {
		Session.set('loggedIn', false);
	}

	
	twttr.events.bind(
	  'tweet',
	  function (event) {
	    var quoteId = event.target.id
	    Meteor.call('incTweets', quoteId, function(){
	    	console.log("Incremented tweet")
	    })
	  }
	);
})

Template.layout.events({
	'click .transition-link': function(e){
		console.log(e);
		e.preventDefault();
		var url = $(e.currentTarget).attr('href');

		if (url !== window.location.pathname){
			var page = $('.page');
			var pageTitle = Session.get('currentPageTitle');
			var animationSequence = PageAnimationSequences[pageTitle];

			_.each(animationSequence, function(element, index){
				AnimateItem($(element.item), element.animation);
			});
			

			var items = $('.item');

			_.each(items, function(item, index){
				TweenMax.to(item, .6, {
					opacity: 0,
					y: -20,
					ease: Power3.easeOut,
					delay: index * .025
				})
			})

			Meteor.setTimeout(function(){
				Router.go(url);
			}, 300);
		} else {
			return false;
		}
	}
})