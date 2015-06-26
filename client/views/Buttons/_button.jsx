var styles={
	base: {
		border: 0,
		borderRadius: 3,
		fontSize: "1rem",
		padding: '.5rem 1rem',
		transition: 'background 300ms ease-out',
		cursor: 'pointer',
		':hover':{
			backgroundColor: Colors.green
		}
	},
	blue: {
		backgroundColor: Colors.blue,
		color: 'white',
		':hover':{
			backgroundColor: Color(Colors.blue).darken(.2).hexString()
		}
	},
	yellow: {
		backgroundColor: Colors.primary,
		color: 'white',
	},
	large: {
		fontSize: '1.2rem',
		padding: '1rem 1.5rem'
	},
	extraLarge: {
		fontSize: '1.5rem',
		padding: '1.25rem 2rem'
	}
};

Button = React.createClass(Radium.wrap({
	propTypes: {
		color: React.PropTypes.oneOf(['blue', 'green', 'yellow'])
	},
	render: function(){
		return (
			<button
				style={[
					styles.base,
					styles[this.props.color],
					styles[this.props.size],
				]}
				{...this.props}>
				{this.props.children}
			</button>
		)
	}
}));