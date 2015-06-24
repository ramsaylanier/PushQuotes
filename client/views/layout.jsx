Template.layout.onRendered(function(){
	if (Meteor.userId()){
		Session.set('loggedIn', true); 
	} else {
		Session.set('loggedIn', false);
	}

	console.log(twttr);

	twttr.events.bind(
	  'tweet',
	  function (event) {
	    // Do something there
	    console.log("Tweeted")
	    console.log(event)
	    var quoteId = event.target.id
	    /*Psuedocode for server
	    
			if(!Quotes.findOne(quoteId).tweets)
				Quotes.update({_id:quoteId},{$set:{tweets:1}})
			else
				Quotes.update({_id:quoteId},{$inc:{tweets:1}})

	    */
	  }
	);
})

Template.layout.events({
	'click .transition-link': function(e){
		e.preventDefault();
		var url = $(e.currentTarget).attr('href');

		if (url !== window.location.pathname){
			var page = $('.page');
			var pageTitle = Session.get('currentPageTitle');
			var animationSequence = PageAnimationSequences[pageTitle];

			_.each(animationSequence, function(element, index){
				AnimateItem($(element.item), element.animation);
			});
			// AnimateItem(page, Session.get('animateOut') || DefaultPageAnimateOut);

			var items = $('.item');

			_.each(items, function(item, index){
				$(item).velocity({
					opacity: 0,
					translateY: -20
				}, {duration: 1000, easing:[300, 20], delay: index * 50}); 
			})

			Meteor.setTimeout(function(){
				Router.go(url);
			}, 500);
		} else {
			return false;
		}
	}
})