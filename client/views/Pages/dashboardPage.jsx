Template.dashboardPage.onRendered(function(){
	var instance = this;
	instance.username = Router.current().params.username;
	
	instance.component = React.render(
		<div className="wrapper">
			<DeckList/>
		</div>,
		document.getElementById('page')
	)
	
	instance.autorun(function(){
		instance.username = Router.current().params.username;
		instance.deckSub = Meteor.subscribe('deckList', {authorName: instance.username}, instance.username);
		instance.deckQuery = {authorName: instance.username};

		if (instance.deckSub.ready()){
			instance.component.setState({deck: Decks.find(instance.deckQuery)});
		}
	});
});

Template.dashboardPage.onDestroyed(function(){
	React.unmountComponentAtNode(document.getElementById('page'));
});