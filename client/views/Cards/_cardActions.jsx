CardActions = React.createClass({
	onClick(e){
		e.preventDefault();
		var modal = $('body').append('<div class="modal"></div>');
		React.render(
			<Modal>
				<ul className="actions-list">
					{this.props.actions.map(function(action){
						var icon = action.icon || null;
						return (
							<li key={action.name} className={"card-action-item"}>
								<a href={action.href} className={action.name.toLowerCase().replace(/ +/g, '-') + '-action'} onClick={action.action}>
									{action.name}
									{icon && action.icon}
								</a>
							</li>
						)
					})}
				</ul>
			</Modal>
		, $('.modal').get(0));
	},
	render(){
		return(
			<ActionToggle action={this.props.action} />
		)
	}
})

ActionToggle = React.createClass({
	handleClick(){
		return this.props.action;
	},
	render(){
		return(
			<div className="card-actions" onClick={this.handleClick()}>
				<span className="ellipses">

				</span>
			</div>
		)
	}
})