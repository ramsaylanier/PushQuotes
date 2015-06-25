Template.searchResults.onRendered(function(){


	React.render(
		
		
		<SearchIterator results={this.data.searchQuery}/>
		,
		document.getElementById('search-results-page')
	)

})

Template.search.onDestroyed(function(){
	React.unmountComponentAtNode(document.getElementById('search-results-page'));
});