DeckList = React.createClass({
	componentWillMount(){
		Session.set('itemCount', 1);
	},
	render(){
		var instance = this;

		return (
			<div className="deck-content">
				<ul className={this.props.className || "" + 'card-list'}>					
					{this.props.decks.map(function(deck){
						return (
							<Card key={deck._id} showAuthor={instance.props.showAuthor} {...deck} favorites={instance.props.favorites}/>
						)
					})}
					
					{this.props.decks.length == 0 && 
						<p>{this.props.message || "Nothing here!"}</p>
					}
				</ul>
			</div>
		)
	}
});