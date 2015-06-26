SearchIterator = ReactMeteor.createClass({
	getResults: function(query){
		console.log(query
			)
		var regexQuery = {
			$regex: '.*' + query + '.*',
			$options: 'gi'
		}


		return Decks.find({
			
			$or: [
				{
					title: regexQuery
				},
				{
					hashtags: regexQuery
				}
			],
			isPrivate: false

		}).fetch()
	},
	render: function(){
		return (
			<div id="searchIterator">
				<Headings.h4>Search Results for {this.props.results}</Headings.h4>

				<ul className="search-results">
					{this.getResults(this.props.results).map(function(deck){
						return (
							<div key={deck.slug}>
								<Headings.h6>{deck.title}</Headings.h6>
							</div>
						)
					})}
				</ul>
			</div>
		)
	}
});