Template.deckSingle.onRendered(function(){
	var instance = this;

	instance.component = React.render(
		<div className="wrapper">
			<DeckList />
			<QuoteList />
		</div>,
		document.getElementById('page')
	);

	instance.autorun(function(){
		instance.username = Router.current().params.username;
		instance.slug = Router.current().params.slug;
		instance.query = {authorName: instance.username, slug: instance.slug};
		instance.deckSub = Meteor.subscribe('deckList', instance.query, instance.username);
		instance.quoteSub = Meteor.subscribe('quoteList', instance.query);
		instance.deckQuery = {authorName: instance.username};

		if (instance.deckSub.ready() && instance.quoteSub.ready()){
			instance.component.setState({deck: Decks.find(instance.deckQuery)});
		}
	});
});

Template.deckSingle.onDestroyed(function(){
	var instance = this;
	React.unmountComponentAtNode(document.getElementById('page'));
});