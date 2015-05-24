Toggle = React.createClass({
	render: function(){
		return (
			<button {...this.props}>
				<div className="bar bar-1"></div>
				<div className="bar bar-2"></div>
				<div className="bar bar-3"></div>
			</button>
		)
	}
})