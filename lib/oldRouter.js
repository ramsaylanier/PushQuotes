// Router.route('/login',{
// 	action: function(){
// 		if (Meteor.user()){
// 			console.log('user');
// 			this.redirect('/' + Meteor.user().username);
// 		} else {
// 			this.render('loginPage');
// 		}
// 	}
// });

// Router.route('/register', function(){
// 	this.render('registerPage');
// })

// Router.route('/search', function(){
// 	this.render('search');
// })

// Router.route('/profile', function(){
// 	this.render('profilePage');
// })

// Router.route('/search/:searchQuery', {
// 	waitOn: function(){
// 		var decodedSearchQuery = decodeURIComponent(this.params.searchQuery)
// 		return Meteor.subscribe('searchResults', decodedSearchQuery, Object.keys(this.params.query))
// 	},
// 	data: function(){
// 		return this.params
// 	},
// 	action: function(){
// 		this.render('searchResults')
// 	}
// })

// Router.route('/hashtag/:hashtag', {
// 	waitOn: function(){
// 		return Meteor.subscribe('hashtag', this.params.hashtag)
// 	},
// 	data: function(){
// 		return this.params
// 	},
// 	action: function(){
// 		this.render('hashtagResults')
// 	}
// })

// Router.route('/favorites', {
// 	waitOn: function(){ //can't use onBeforeAction, as waitOn short circuits it, so the publication has to check if the user is logged in
// 		return [Meteor.subscribe('userProfile'), Meteor.subscribe('favorites')]
// 	},
// 	action: function(){
// 		if(!Meteor.user())
// 			this.redirect('/')
// 		this.render('favorites');
// 	}
// });

// Router.route('/:username', {
// 	data: function(){
// 		return this.params;
// 	},
// 	action: function(){
// 		this.render('dashboardPage');
// 	}
// })

// Router.route('/:username/:slug',{
// 	onBeforeAction: function(){
// 		var deck = Decks.findOne({authorName: this.params.username, slug: this.params.slug});
// 		if (deck.live && this.params.username !== Meteor.user().username){
// 			this.redirect('/' + this.params.username + '/' + this.params.slug + '/live');
// 		} else {
// 			this.next()
// 		}
// 	},
// 	waitOn: function(){
// 		return Meteor.subscribe('deckList', {authorName: this.params.username, slug: this.params.slug}, this.params.username);
// 	},
// 	data: function(){
// 		return Decks.findOne
// 	},
// 	action: function(){
// 		this.render('deckSingle');
// 	}
// });

// Router.route('/:username/:slug/live',{
// 	onBeforeAction: function(){
// 		var deck = Decks.findOne({authorName: this.params.username, slug: this.params.slug});

// 		if (deck.live){
// 			this.next();
// 		} else {
// 			this.redirect('/' + this.params.username + '/' + this.params.slug);
// 		}
// 	},
// 	waitOn: function(){
// 		return Meteor.subscribe('deckList', {authorName: this.params.username, slug: this.params.slug}, this.params.username);
// 	},
// 	action: function(){
// 		this.render('deckLive');
// 	}
// })