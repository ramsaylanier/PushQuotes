module.exports = function() {

	var DeckId;

	this.Before(function (callback){ 
		
		var self = this;

		self.server.call('reset').then( function(){
			return self.server.call('user/create');
		}).then( function(){
			return self.server.call('deck/removeAll');
		}).then( callback );
	})

	this.Given(/^I am logged in$/, function (callback) {
		var self = this;
		self.client.url(process.env.ROOT_URL).
		executeAsync(function (done) {
		  Meteor.loginWithPassword('RamsayLanier', 'good password', done);
		}).call(callback);
	});

	this.Given(/^I have created a deck$/, function (callback) {
		var self = this;

		self.client.
			waitForVisible('.deck-list').call(function(){
				self.server.call('deck/create').then(function(deckId){
					DeckId = deckId;
					self.server.call('quotes/add').then(callback);
				});
			});
	});

	this.When(/^I click the delete button$/, function (callback) {
		var self = this;

		self.client.
			waitForVisible('.delete-action').
			click('.delete-action').alertAccept().call(callback);
	});

	this.Then(/^the deck and its quotes should be removed from the database$/, function (callback) {
		this.server.call('checkDeck', DeckId).then(function(res){
			if (res.error){
				callback.fail(res.reason)
			} else {
				callback();
			}
		})		

	});
}