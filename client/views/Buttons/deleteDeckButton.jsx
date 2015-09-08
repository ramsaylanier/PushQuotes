DeleteDeckButton = React.createClass({
	handleClick(){
		var confirmDelete = confirm('Do you want to delete this deck?');

		if (confirmDelete){
			var deckId = this.props.deck._id;

			Meteor.call('deleteForm', deckId, function(error){
				if (error){
					alert(error)
				} else {
					Animations.AnimateModalOut();
					FlowRouter.go('/');
				}
			})
		}
	},
	render(){
		return(
			 <button className="btn negative-btn flex-1" onClick={this.handleClick}>Delete Deck</button>
		)	
	}
})