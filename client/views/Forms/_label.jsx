Label = React.createClass({
	render: function(){

		var styles = {
			base: {
				position: "absolute",
				fontSize: ".8rem",
				marginBottom: 5,
				bottom: 15,
				left: 10,
				zIndex: 2,
				pointerEvents: "none"
			}
		}

		return (
			<label name={this.props.name + '-label'} className='floating-label'>
				{this.props.label}
			</label>
		)
	}
});