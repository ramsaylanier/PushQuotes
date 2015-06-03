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

Link = React.createClass(Radium.wrap({
	render: function(){
		return(
			<a 
				style={[
					styles.base,
					styles[this.props.type],
					styles[this.props.color],
					styles[this.props.size],
					styles[this.props.bg],
					styles[this.props.align],
					this.props.block && styles.block
				]} 
				{...this.props}>
				{this.props.children}
			</a>
		)
	}
}));