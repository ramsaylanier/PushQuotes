Template.searchResults.onRendered(function(){
	var instance = this;
	
	instance.component = React.render(
		<div className="wrapper">
			<DeckList message="No search results found!" className="search-results" showAuthor={true}/>
		</div>,
		document.getElementById('search-results-page')
	)
	
	instance.autorun(function(){
		instance.deckSub = Meteor.subscribe('searchResults', instance.data.searchQuery, Router.current().params.query);
	});
});

Template.searchResults.onDestroyed(function(){
	React.unmountComponentAtNode(document.getElementById('search-results-page'));
});