FavoriteDeck = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData(){
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
		})
	},
	render(){
		return (
			<div className="favorite-deck">
				<Favorite onClick={this.toggleFavorite} isFavorite={this.isFavorite()}/>
			</div>
		)
	}
});