Template.deckLive.onCreated(function(){
	Session.set('limit', 1);
});

Template.deckLive.onRendered(function(){
	var instance = this;
	
	instance.component = React.render(
		<div className="wrapper">
			<QuoteList isLive={true} />
		</div>,
		document.getElementById('page')
	);

	instance.autorun(function(){
		Session.set('quoteCount', 1);
		instance.username = Router.current().params.username;
		instance.slug = Router.current().params.slug;
		instance.query = {authorName: instance.username, slug: instance.slug};
		instance.deckSub = Meteor.subscribe('deckList', instance.query, instance.username);
		instance.quoteSub = Meteor.subscribe('quoteList', instance.query, true);

		instance.deckQuery = {authorName: instance.username};

		if (instance.deckSub.ready() && instance.quoteSub.ready()){
			var deck = Decks.findOne(instance.deckQuery);
			if (deck.goLive){
				instance.component.setState({deck: deck});
			} else {
				instance.component.setState({deck: null});
			}
		}
	});
});