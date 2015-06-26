DeckSearchList = ReactMeteor.createClass({
	getMeteorState: function(){
		return {decks: Decks.find().fetch()};
	},
	render: function(){
		return (
			<ul className="deck-list deck-search-list">
				{this.state.decks.map(function(deck){
					return (
						<DeckItem key={deck._id} {...deck} showAuthor={true}/>
					)
				})}
			</ul>
		)
	}
});