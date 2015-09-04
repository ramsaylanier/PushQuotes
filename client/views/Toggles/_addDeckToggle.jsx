AddDeckToggle = React.createClass({
	clickHandler(){
		FlowRouter.go('/new-deck');
	},
	render(){
		return (
			<div className="toggle floating-toggle">
				<a className="transition-link" onClick={this.clickHandler}>
					{Icons.PlusIcon}
				</a>
			</div>
		)
	}
})