FavoriteQuote = ReactMeteor.createClass(Radium.wrap({
	getMeteorState: function(){
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
				Errors.throw(e.reason)
		})
		
	},
	render: function(){

		return (
			<div class="favorite-quote">
				<Favorite onClick={this.toggleFavorite} isFavorite={this.state.isFavorite}/>
			</div>
		)
	}
}));