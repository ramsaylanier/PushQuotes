CardTitle = React.createClass({
	render(){

		var link = this.props.link;

		return (
			<h2 className="card-title">
				{link ?
					<a href={link} className={this.props.classes}>{this.props.children}</a>
					:
					this.props.children
				}
			</h2>
		)
	}
})