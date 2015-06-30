Decks = new Mongo.Collection('decks');

Meteor.methods({
	createDeck: function(deckAttributes){

		if (!deckAttributes.title){
			throw new Meteor.Error(422, 'Please give your deck a title.')
		}

		if (typeof(deckAttributes.title) !== 'string'){
			throw new Meteor.Error(422, 'Nice Try, HAX0R. Your deck title must be a string.');	
		}

		if (!deckAttributes.author || deckAttributes.author !== this.userId){
			throw new Meteor.Error(422, 'Nice Try, HAX0R. You must be logged in.');		
		}

		var existingDeckWithTitle = Decks.findOne({author: this.userId, title: deckAttributes.title});
		var existingSlug = Decks.findOne({author: this.userId, slug: deckAttributes.slug});

		if (existingDeckWithTitle){
			throw new Meteor.Error(422, 'You already have a Deck with this title.');	
		}

		if (existingSlug){
			throw new Meteor.Error(422, 'You already have a Deck with this slug.');	
		}

		deckAttributes.authorName = Meteor.users.findOne(this.userId).username;
		deckAttributes.quotes = [];
		deckAttributes.followers = [];
		deckAttributes.isPrivate = false;
		deckAttributes.description = 'No description';

		var deckId = Decks.insert(deckAttributes);

		return deckId;
	},
	editDeck: function(deckID, deckAttributes){

		var deck = Decks.findOne(deckID);

		if (!deckAttributes.title){
			throw new Meteor.Error(422, 'Please give your deck a title.')
		}

		if (this.userId !== deck.author){
			throw new Meteor.Error(422, 'You are not the author of this deck.')
		}

		var existingDeckWithTitle = Decks.findOne({author: this.userId, title: deckAttributes.title});
		var existingSlug = Decks.findOne({author: this.userId, slug: deckAttributes.slug});

		if (existingDeckWithTitle && existingDeckWithTitle._id !== deckID){
			throw new Meteor.Error(422, 'You already have a Deck with this title.');	
		}

		if (existingSlug && existingSlug._id !== deckID){
			throw new Meteor.Error(422, 'You already have a Deck with this slug.');	
		}

		var deckId = Decks.update({_id: deckID}, {$set: {title: deckAttributes.title, withSlides: deckAttributes.withSlides, hashtags: deckAttributes.hashtags, slug: deckAttributes.slug, description: deckAttributes.description, isPrivate: deckAttributes.isPrivate}});

		return deckId;
	},
	deleteForm: function(deckID){
		var deck = Decks.findOne(deckID);
		if (this.userId != deck.author){
			throw new Meteor.Error(422, 'You are not the author of this deck.');
		}

		Decks.remove(deckID);
	},
	updateLive: function(authorName, deckSlug){
		var deck = Decks.findOne({authorName: authorName, slug: deckSlug});
		var setLive = (deck.live ? false: true);

		if (deck.author !== this.userId){
			throw new Meteor.Error(422, 'You are not the author of this deck.')
		}

		Decks.update({_id: deck._id}, {$set: {live: setLive}});

		if (!setLive){
			Quotes.update({deckId: deck._id}, {$set: {active:false}}, {multi: true});
		}

		return setLive;
	},
	renderNextQuote: function(deck){
		if (deck.author !== this.userId){
			throw new Meteor.Error(422, 'You are not the author of this deck.')
		}

		var quotes = Quotes.find({deckId: deck._id, active: false}, {sort: {order: 1}}).fetch();
		var quoteToUpdate;

		if (quotes.length > 0){
			quoteToUpdate = quotes[0]._id;
		}

		Quotes.update({_id: quoteToUpdate}, {$set: {active:true}});
	},
	renderPreviousQuote: function(deck){
		if (deck.author !== this.userId){
			throw new Meteor.Error(422, 'You are not the author of this deck.')
		}

		var quotes = Quotes.find({deckId: deck._id, active: true}, {sort: {order: -1}}).fetch();
		var quoteToUpdate;

		if (quotes.length > 0){
			quoteToUpdate = quotes[0]._id;
		}

		Quotes.update({_id: quoteToUpdate}, {$set: {active:false}});
	},
	updateQuotesFromExtension: function(slideURL, username, deckURL){
		var slide = slideURL.replace(/^\D+/g, '');
		var deck = Decks.findOne({authorName: username, slug: deckURL});

		if (!deck.live){
			Decks.update({_id: deck._id}, {$set: {live:true}});
		}

		Quotes.update({deckId: deck._id, slide: slide}, {$set: {active: true}});



		return "test"
	},
	loginFromExtension: function(username, password){
		  try {
		    if (ApiPassword.isPasswordValid(username, password)) {
		    	console.log('password is valid for this user');
		    	return true;
		    } else {
		    	return 'Password is not valid.'
		    }
		  } catch (exc) {

		      console.log(exc.message);
		      return exc.message;
		      // 'User is not found', 'User has no password set', etc
		  }
	}
});

Decks.before.remove(function(userId, doc){ 
	var deckId = doc._id;

	if (this.userId != doc.author){
		throw new Meteor.Error(422, 'You are not the author of this deck.');
	}

	Quotes.remove({deckId: deckId});
});