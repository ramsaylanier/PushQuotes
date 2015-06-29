DeckList = ReactMeteor.createClass({
	getMeteorState: function(){
		return {decks: Decks.find().fetch()};
	},
	componentWillMount: function(){
		Session.set('itemCount', 1);
	},
	render: function(){
		var instance = this;
		return (
			<ul className={this.props.className || "" + "deck-list"}>
				<AuthorName key={this.state.decks}/>
				{this.state.decks.map(function(deck){
					return (
						<DeckItem key={deck._id} showAuthor={instance.props.showAuthor} {...deck}/>
					)
				})}
				{this.state.decks.length == 0 && 
					<Headings.p>{this.props.message || "Nothing here!"}</Headings.p>
				}
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