FavoriteDeck = React.createClass(Radium.wrap({
	getInitialState: function(){
		return {isFavorite: this.isFavorite()}
	},
	isFavorite: function(){
		if(!Meteor.user().favorites)
			return false

		return Meteor.user().favorites[this.props._id] != undefined
	},
	toggleFavorite: function(e){
		var instance = this
		Meteor.call('modifyDeckFavorite', this.props._id, !this.isFavorite(), function(e, r){
			if(e){
				console.log(e)
				Errors.throw(e.reason)
			}
			else{
				instance.setState({isFavorite: r.status})
			}
		})
		
	},
	render: function(){

		return (
			<div className="favorite-deck">
				<Favorite onClick={this.toggleFavorite} isFavorite={this.state.isFavorite}/>
			</div>
		)
	}
}));