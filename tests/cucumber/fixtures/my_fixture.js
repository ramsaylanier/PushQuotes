(function () {

  'use strict';

	if (Meteor.isServer){

		Meteor.methods({
		    'reset' : function() {
		    	Meteor.users.remove({});
		    	this.setUserId(null);
		    },
		    'deck/create':function (){
		    	var userId = Meteor.users.findOne()._id;
		    	this.setUserId(userId);

		    	var deckAttributes = {
					title: 'Test title',
					slug: 'test-title',
					hashtags: ['hashtags'],
					withSlides: false,
					author: userId
				};

		    	var deckId = Meteor.call('createDeck', deckAttributes);

		    	return deckId;
		    },
		    'deck/removeAll':function (){
		    	Decks.remove({});
		    },
		    'quotes/add': function(){
		    	var deckId = Decks.findOne()._id;
		    	var quoteAttributes = {
		    		text: 'this is a test quote',
		    		order: 1
		    	}

		    	Meteor.call('addQuote', deckId, quoteAttributes);
		    },
		    'user/create': function (){
		    	Accounts.createUser({
					username: "RamsayLanier",
					email: "ramsay@test.com",
					password: "good password",
					profile: {
					  name: "Ramsay Lanier"
					}
				});
		    },
		    'user/get': function(){
		    	var user = Meteor.users.findOne();
		    	return user;
		    },
		    'checkDeck': function(deckId){
		    	var deck = Decks.findOne(deckId);
		    	var quotes = Quotes.find({deckId: deckId});

		    	if (deck){
		    		return new Meteor.Error(422, 'Deck Still Exists.')
		    	} else if (quotes.count() !== 0) {
		    		return new Meteor.Error(422, 'Quotes still exist.')
		    	} else {
		    		return true
		    	}
		    }
		});
	}

	Meteor.startup(function() {  
		if (Meteor.isClient || !process.env.IS_MIRROR) {
			return;
		}
	});
})();