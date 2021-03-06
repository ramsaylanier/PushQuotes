var styles = {
	base: {
		color: Colors.primary,
		transition: "all 300ms ease-out",
		cursor: "pointer"
	},
	block:{
		display: 'block'
	},
	button:{
		padding: '.5rem 1rem',
		borderRadius: 3,
		textAlign: 'center'
	},
	large:{
		fontSize: "1.2rem",
		padding: '1rem 2rem'
	},
	tweet: {
		padding: '.5rem 1rem',
		borderRadius: 3,
		backgroundColor: Colors.blue,
		color: "white",
		':hover':{
			backgroundColor: Colors.green
		}
	},
	primary:{
		padding: '.5rem 1rem',
		borderRadius: 3,
		backgroundColor: Colors.primary,
		color: "white",
		':hover':{
			backgroundColor: Colors.green
		}
	},
	center:{
		textAlign: "center",
		display: "table",
		marginLeft: "auto",
		marginRight: "auto"
	}
}

Link = React.createClass({
	render: function(){
		return(
			<a id={this.props.quoteId} {...this.props}>
				{this.props.children}
			</a>
		)
	}
});