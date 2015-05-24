DeckList = ReactMeteor.createClass({
	getMeteorState: function(){
		console.log('getMeteorState');
		return {decks: Decks.find().fetch()};
	},
	componentWillMount: function(){
		Session.set('itemCount', 1);
	},
	render: function(){
		return (
			<ul className="deck-list">
				<PageTitle key={this.state.decks}/>
				{this.state.decks.map(function(deck){
					return (
						<DeckItem key={deck._id} {...deck}/>
					)
				})}
			</ul>
		)
	}
});

Count = React.createClass({
	render: function(){		
		return (
			<p className="small meta-item">
				{this.props.icon ? this.props.icon : this.props.name}
				<span className="count">{this.props.count}</span>
			</p>
		)
	}
});