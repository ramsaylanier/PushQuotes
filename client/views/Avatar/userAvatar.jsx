UserAvatar = React.createClass({
	render: function(){

		return (
			<img 
				className="user-avatar" 
				src={this.props.image} />
		)
	}	
});