Template.deckLive.onCreated(function(){
	Session.set('limit', 1);
});

Template.deckLive.onRendered(function(){
	var instance = this;
	
	instance.activeQuote = new ReactiveVar(1);

	instance.component = React.render(
		<div className="wrapper">
			<QuoteList isLive={true} />
		</div>,
		document.getElementById('page')
	);

	instance.autorun(function(){
		console.log('autorun')
		Session.set('itemcount', 1);
		instance.activeQuote.set(Decks.findOne().activeQuote);
		instance.username = Router.current().params.username;
		instance.slug = Router.current().params.slug;
		instance.query = {authorName: instance.username, slug: instance.slug};
		instance.deckSub = Meteor.subscribe('deckList', instance.query, instance.username);
		instance.quoteSub = Meteor.subscribe('quoteList', instance.query, instance.activeQuote.get());
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