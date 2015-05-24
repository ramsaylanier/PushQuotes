Label = React.createClass({
	render: function(){
		return (
			<label name={this.props.name + '-label'}>{this.props.label}</label>
		)
	}
})