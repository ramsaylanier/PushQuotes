Template.hashtagResults.onRendered(function(){
	var instance = this;
	
	instance.component = React.render(
		<div className="wrapper">
			<DeckList message="No decks with that hashtag found!" className="hashtag-results" showAuthor={true}/>
		</div>,
		document.getElementById('hashtag-results-page')
	)
	
	instance.autorun(function(){
		instance.deckSub = Meteor.subscribe('hashtagResults', instance.data.hashtag);
	});
});

Template.searchResults.onDestroyed(function(){
	React.unmountComponentAtNode(document.getElementById('hashtag-results-page'));
});