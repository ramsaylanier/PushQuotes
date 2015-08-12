DeckList = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData(){
		var username = Router.current().params.username;
		var subscription = Meteor.subscribe('deckList', {authorName: username}, username);
		var deckQuery = {authorName: username};
		return {decks: Decks.find().fetch()};
	},
	componentWillMount(){
		Session.set('itemCount', 1);
	},
	render(){
		var instance = this;
		return (
			<div className="deck-content">
				<div className="wrapper">
					<ul className={this.props.className || "" + 'card-list'}>
						{this.props.showAuthor && 
							<AuthorName key={this.data.decks}/>
						}
						
						{this.data.decks.map(function(deck){
							return (
								<DeckItem key={deck._id} showAuthor={instance.props.showAuthor} {...deck} favorites={instance.props.favorites}/>
							)
						})}
						
						{this.data.decks.length == 0 && 
							<p>{this.props.message || "Nothing here!"}</p>
						}
					</ul>
				</div>
			</div>
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