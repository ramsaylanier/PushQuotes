DeleteQuoteButton = React.createClass({
	handleClick(){
		var confirmDelete = confirm('Do you want to delete this quote?');

		if (confirmDelete){
			var quoteId = this.props.quote._id;

			Meteor.call('deleteQuote', quoteId, function(error){
				if (error){
					alert(error)
				} else {
					Animations.AnimateModalOut();
				}
			})
		}
	},
	render(){
		return(
			 <button className="btn negative-btn flex-1" onClick={this.handleClick}>Delete Quote</button>
		)	
	}
})