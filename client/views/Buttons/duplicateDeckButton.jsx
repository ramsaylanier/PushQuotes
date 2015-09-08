DuplicateDeckButton = React.createClass({
	handleClick(){
		var deckId = this.props.deck._id;

		Meteor.call('duplicateDeck', deckId, function(error){
			if (error){
				alert(error)
			} else {
				Animations.AnimateModalOut();
			}
		});
	},
	render(){
		return(
			 <button className="btn secondary-btn flex-1" onClick={this.handleClick}>Duplicate Deck</button>
		)	
	}
})