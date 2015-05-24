var styles={
	base: {
		border: 0,
		borderRadius: 3,
		padding: '.5rem 1rem',
		transition: 'background 300ms ease-out',

		':hover':{
			backgroundColor: 'purple'
		}
	},
	blue: {
		backgroundColor: Colors.twitter,
		color: 'white'
	},
	large: {
		fontSize: '1.2rem',
		padding: '1rem 1.5rem'
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
				]}>
				{this.props.children}
			</button>
		)
	}
}));