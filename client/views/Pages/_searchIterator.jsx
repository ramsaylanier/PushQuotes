SearchIterator = ReactMeteor.createClass({
	getResults: function(query){
		console.log(query
			)
		var regexQuery = {
			$regex: '.*' + query + '.*',
			$options: 'gi'
		}//add better checking for queries with spaces, maybe split on space and render a bunch of ors


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
				<Headings.h4>Search Results for "{this.props.results}"</Headings.h4>

				<ul className="search-results">
					{this.getResults(this.props.results).map(function(deck){
						return (
							<div key={deck.slug}>
								<Link href={"/" + deck.authorName + "/" + deck.slug}>
									<Headings.h5>{deck.slug}</Headings.h5>
								</Link>
								<Link href={"/" + deck.authorName}>
									<Headings.p>By {deck.authorName}</Headings.p>
								</Link>
							</div>
						)
					})}
				</ul>
			</div>
		)
	}
});