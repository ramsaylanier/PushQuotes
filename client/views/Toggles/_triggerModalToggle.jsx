TriggerModalToggle = React.createClass({
	render(){
		return (
			<div className="toggle floating-toggle">
				<a href={this.props.url} className="transition-link" onClick={this.props.trigger}>
					{Icons.PlusIcon}
				</a>
			</div>
		)
	}
})