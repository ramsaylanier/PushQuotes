Alert = React.createClass({
	render: function(){
		console.log(this);
		return (
			<div className={"alert " + this.props.alertType.type}>
				<p>{this.props.alertType.alertText}</p>
			</div>
		)
	}
})