Alerts = function(type, alertText){
	this.type = type;
	this.alertText = alertText;

	if (this.type === 'prompt'){

	}
}


DeleteDeckAlert = new Alerts('prompt', 'Do you want to delete this Deck?');
