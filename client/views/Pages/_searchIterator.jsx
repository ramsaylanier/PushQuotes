SearchIterator = ReactMeteor.createClass({
	getResults: function(){
		return ["a","b","c"]
	},
	render: function(){
		return (
			<div id="searchIterator">
				<Headings.h4>Search Results for {this.props.results}</Headings.h4>

				<ul className="search-results">
					{this.getResults().map(function(temp){
						return (
							<p key={temp}>{temp}</p>
						)
					})}
				</ul>
			</div>
		)
	}
});