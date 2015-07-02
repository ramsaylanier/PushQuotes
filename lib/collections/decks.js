Decks = new Mongo.Collection('decks');

function verify(deckAttributes, userId, deckId){
	if (!deckAttributes.title){
		throw new Meteor.Error(422, 'Please give your deck a title.')
	}

	if(deckId){
		var deck = Decks.findOne(deckId);

		if(userId !== deck.author){
			throw new Meteor.Error(422, 'You are not the author of this deck.')
		}
	}

	var titleLengthLimit = 140
	if(deckAttributes.title.length > titleLengthLimit)
		throw new Meteor.Error(422, "Your title can't be longer than " + titleLengthLimit + " characters!")

	if (!deckAttributes.slug){
		throw new Meteor.Error(422, 'Please give your deck a slug.')
	}

	if(deckAttributes.slug.length > titleLengthLimit)
		throw new Meteor.Error(422, "Your slug can't be longer than " + titleLengthLimit + " characters!")


	if (typeof(deckAttributes.title) !== 'string'){
		throw new Meteor.Error(422, 'Nice Try, HAX0R. Your deck title must be a string.');	
	}

	if (!deckAttributes.author || deckAttributes.author !== userId){
		throw new Meteor.Error(422, 'Nice Try, HAX0R. You must be logged in.');		
	}


	deckAttributes.hashtags = deckAttributes.hashtags.split(/[\,\s\#]/g)

	_.each(deckAttributes.hashtags, function(hashtag, index){
		deckAttributes.hashtags[index] = hashtag.trim();
	})

	deckAttributes.hashtags = _.filter(deckAttributes.hashtags, function(e){
		return e.length > 0
	})

	deckAttributes.hashtags = _.uniq(deckAttributes.hashtags)


	var hashtagLimit = 5;
	var acceptableHashtagRegex = /^[a-zA-Z0-9]+$/g;
	var maxHashtagLength = 20;

	if(deckAttributes.hashtags.length > hashtagLimit){
		throw new Meteor.Error(422, "Sorry! You can only have " + hashtagLimit + " hashtags!")
	}

	var allHashtagsPass = _.every(deckAttributes.hashtags, function(el){
		return el.match(acceptableHashtagRegex)
	})

	var allHashtagsShortEnough = _.every(deckAttributes.hashtags, function(el){
		return el.length < maxHashtagLength
	})

	if(!allHashtagsPass){
		throw new Meteor.Error(422, "Make sure you're using valid hashtags! Only alphanumeric characters are allowed!")
	}

	if(!allHashtagsShortEnough){
		throw new Meteor.Error(422, "Make sure all of your hashtags are less than " + maxHashtagLength + " characters!")
	}

	var existingDeckWithTitle = Decks.findOne({author: userId, title: deckAttributes.title});
	var existingSlug = Decks.findOne({author: userId, slug: deckAttributes.slug});

	if (existingDeckWithTitle && (!deckId || deckId != existingDeckWithTitle._id)){
		throw new Meteor.Error(422, 'You already have a Deck with this title.');
	}

	if (existingSlug && (!deckId || deckId != existingSlug._id)){
		throw new Meteor.Error(422, 'You already have a Deck with this slug.');	
	}

	return deckAttributes
}

Meteor.methods({
	createDeck: function(originalDeckAttributes){

		var deckAttributes = verify(originalDeckAttributes, this.userId)

		deckAttributes.authorName = Meteor.users.findOne(this.userId).username;
		deckAttributes.quotes = [];
		deckAttributes.followers = [];
		deckAttributes.isPrivate = false;
		deckAttributes.description = 'No description';

		var deckId = Decks.insert(deckAttributes);

		return deckId;

		
	},
	editDeck: function(deckId, originalDeckAttributes){


		var deckAttributes = verify(originalDeckAttributes, this.userId, deckId)

		var updatedDeckId = Decks.update({_id: deckId}, {$set: {title: deckAttributes.title, withSlides: deckAttributes.withSlides, hashtags: deckAttributes.hashtags, slug: deckAttributes.slug, description: deckAttributes.description, isPrivate: deckAttributes.isPrivate}});

		return updatedDeckId;

	},
	deleteForm: function(deckId){
		var deck = Decks.findOne(deckId);
		if (this.userId != deck.author){
			throw new Meteor.Error(422, 'You are not the author of this deck.');
		}

		Decks.remove(deckId);
	},
	updateLive: function(authorName, deckSlug){
		var deck = Decks.findOne({authorName: authorName, slug: deckSlug});
		var setLive = (deck.live ? false: true);

		if (deck.author !== this.userId){
			throw new Meteor.Error(422, 'You are not the author of this deck.')
		}

		Decks.update({_id: deck._id}, {$set: {live: setLive, hasPlayed: true}});

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

	if (userId != doc.author){
		throw new Meteor.Error(422, 'You are not the author of this deck.');
	}

	Quotes.remove({deckId: deckId});
});