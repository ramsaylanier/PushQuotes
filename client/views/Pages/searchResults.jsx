// Template.searchResults.onRendered(function(){


// 	React.render(
		
		
// 		<SearchIterator results={this.data.searchQuery}/>
// 		,
// 		document.getElementById('search-results-page')
// 	)

// })

// Template.search.onDestroyed(function(){
// 	React.unmountComponentAtNode(document.getElementById('search-results-page'));
// });

Template.searchResults.onRendered(function(){
	var instance = this;
	console.log(this)
	console.log(this.data)
	
	instance.component = React.render(
		<div className="wrapper">
			<DeckSearchList/>
		</div>,
		document.getElementById('search-results-page')
	)
	
	instance.autorun(function(){
		instance.deckSub = Meteor.subscribe('searchResults', instance.data.searchQuery, instance.data.searchSettings);

		if (instance.deckSub.ready()){
			instance.component.setState({deck: Decks.find()});
		}
	});
});

Template.searchResults.onDestroyed(function(){
	React.unmountComponentAtNode(document.getElementById('page'));
});