Template.favorites.onRendered(function(){
	var instance = this;

	instance.component = React.render(
		<div className="wrapper">
			<DeckList message="You don't have any favorites!" className="favorites" showAuthor={true}/>
		</div>,
		document.getElementById('favorites-page')
	)
	
	instance.autorun(function(){
		instance.deckSub = Meteor.subscribe('favorites');
	});
});

Template.searchResults.onDestroyed(function(){
	React.unmountComponentAtNode(document.getElementById('favorites-page'));
});