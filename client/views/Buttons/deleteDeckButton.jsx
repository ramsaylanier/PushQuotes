DeleteDeckButton = React.createClass({
	handleClick(){
		var confirmDelete = confirm('Do you want to delete this deck?');

		if (confirmDelete){
			var deckId = this.props.deck._id;
			var timeout = 300;

			if (FlowRouter.current().route.name == 'deckSingle'){
				timeout = 0;
			}

			var decks = $('.card');
			var activeDeckHeight = $('.card.edit-mode').outerHeight();
			var trigger = false;

			_.each(decks, function(deck){
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

			Meteor.setTimeout(function(){
				Meteor.call('deleteForm', deckId, function(error){
					if (error){
						alert(error)
					} else {
						Animations.AnimateModalOut();
						FlowRouter.go('/');
					}
				})

				_.each(decks, function(deck){
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