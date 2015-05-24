var styles = {
	base: {
		color: Colors.primary,
		transition: "all 300ms ease-out"
	},
	white: {
		color: 'white'
	},
	blueBg: {
		backgroundColor: Colors.blue,

		':hover': {
			backgroundColor: Color(Colors.blue).darken(.1).hexString()
		}
	},
	greenBg: {
		backgroundColor: Colors.green,

		':hover': {
			backgroundColor: Color(Colors.green).darken(.1).hexString()
		}
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
					this.props.block && styles.block
				]} 
				{...this.props}>
				{this.props.children}
			</a>
		)
	}
}));