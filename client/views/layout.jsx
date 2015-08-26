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
		e.preventDefault();
		var url = $(e.currentTarget).attr('href');

		if (url !== window.location.pathname){
			AnimatePageOut();

			Meteor.setTimeout(function(){
				Router.go(url);
			}, 500);
		} else {
			return false;
		}
	}
})