AlertsComponent = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData(){
		return {
			alerts: Alerts.collection.find({seen: false}).fetch()
		}
	},
	updateAlert(){
		
	},
	render(){
		var alerts = this.data.alerts;

		return (
			<div className="alerts-container">
				{alerts.map(function(alert){
					return (
						<Alert key={alert._id} alert={alert}/>
					)
				})}
			</div>
		)
	}
})

Alert = React.createClass({
	componentDidMount(){
		var self = this;
		console.log(this.props.alert);

		var alertId = this.props.alert._id;
		var alert = React.findDOMNode(this.refs.alert);
		Meteor.setTimeout(function(){
			TweenMax.to(alert, 1, {
				opacity: 0
			});
		}, 2000);

		Meteor.setTimeout(function(){
			self.removeAlert();
		}, 3000);
	},
	removeAlert(){
		Alerts.collection.update(this.props.alert._id, {$set: {seen: true}});
		var alert = React.findDOMNode(this.refs.alert);
		React.unmountComponentAtNode(alert);
	},
	render(){
		var alert = this.props.alert;
		return(
			<div ref="alert" className={"alert " + alert.type + "-alert"}>
				{alert.message.reason || alert.message}
			</div>
		)
	}
})