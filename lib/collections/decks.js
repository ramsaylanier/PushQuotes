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

		var deckId = Decks.update({_id: deckID}, {$set: {title: deckAttributes.title, hashtags: deckAttributes.hashtags, slug: deckAttributes.slug, description: deckAttributes.description, isPrivate: deckAttributes.isPrivate}});

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

		return setLive;
	},
	renderQuote: function(direction, deck){
		if (deck.author !== this.userId){
			throw new Meteor.Error(422, 'You are not the author of this deck.')
		}

		var activeQuote = deck.activeQuote;

		(direction === 'next' ? activeQuote ++ : activeQuote --);

		if (activeQuote > deck.quotes.length  ){
			activeQuote --;
		} 

		if (activeQuote <= 0){
			activeQuote ++;
		}

		Decks.update({_id: deck._id}, {$set: {activeQuote: activeQuote}});

		return activeQuote;
	}
})