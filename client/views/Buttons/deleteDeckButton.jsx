DeleteDeckButton = React.createClass({
	handleClick(){
		let confirmDelete = confirm('Do you want to delete this deck?');

		if (confirmDelete){
			let deckId = this.props.deck._id;
			let timeout = 300;

			if (FlowRouter.current().route.name === 'deckSingle'){
				timeout = 0;
			}

			let decks = $('.card');
			let activeDeckHeight = $('.card.edit-mode').outerHeight();
			let trigger = false;

			_.each(decks, deck => {
				if ($(deck).hasClass('edit-mode')){
					trigger = true;
					TweenMax.to(deck, .25, {
						scaleX: .9,
						opacity: 0
					});
				} else if (trigger){
					TweenMax.to(deck, .25, {
						y: -activeDeckHeight
					});
				}
			})

			Meteor.setTimeout( () => {
				Meteor.call('deleteForm', deckId, error => {
					if (error){
						alert(error)
					} else {
						let username = FlowRouter.getParam('username');
						Animations.AnimateModalOut();
						FlowRouter.go('/' + username);
					}
				})

				_.each(decks, deck =>{
					TweenMax.to(deck, 0, {
						y: 0
					});
				})
			}, timeout);
		}
	},
	render(){
		return(
			 <button className="btn negative-btn flex-4-10" onClick={this.handleClick}>{Icons.DeleteIcon}</button>
		)
	}
})
