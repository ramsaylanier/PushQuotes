FavoriteQuote = React.createClass(Radium.wrap({
	getInitialState: function(){
		return {isFavorite: this.isFavorite()}
	},
	isFavorite: function(){
		if(!Meteor.user().favorites)
			return false


		return Meteor.user().favorites[this.props.deckId] && Meteor.user().favorites[this.props.deckId].indexOf(this.props._id) != -1
	},
	toggleFavorite: function(e){
		var instance = this
		console.log("isFavorite",this.isFavorite())
		Meteor.call('modifyQuoteFavorite', this.props._id, this.props.deckId, !this.isFavorite(), function(e, r){
			if(e)
				console.log(e)
			else
				instance.setState({isFavorite: r.status})
		})
		
	},
	render: function(){
		return (
			<p className="small meta-item favorite-p" onClick={this.toggleFavorite}>
				<span className="favorite">{this.state.isFavorite ? "Unfavorite" : "Favorite"}</span>
			</p>
		)
	}
}));