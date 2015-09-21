Alerts = {
	collection: new Mongo.Collection(null),
	throw: function(message, type){
		Alerts.collection.insert({message: message, type: type, seen: false});
		// Alerts.render();
	},
	clear: function(){
		Alerts.collection.remove({seen: true});
	},
	render: function(){
		React.render(
			<AlertsComponent/>,
			$('.alerts-container').get(0)
		)
	}
}
