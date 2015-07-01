Favorite = React.createClass(Radium.wrap({
	render: function(){
		return(
			<div className={(this.props.isFavorite ? "unfavorite" : "favorite") + "-glyph fav-glyph"}
				{...this.props}>
			</div>
		)
	}
}));