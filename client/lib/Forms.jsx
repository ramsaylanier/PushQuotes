newDeckForm = {
	fields: [
		{
			id: 1, 
			type: 'text', 
			name: 'deck-title-field', 
			className:'full-width input-field', 
			label:'Deck Title', 
			onKeyUp: function(e){  
				$('.deck-slug-field').val($(e.currentTarget).val().toLowerCase().replace(/ +/g,'-').replace(/[^\w-]+/g,''));	
			}
		},
		{
			id: 2, 
			type: 'text', 
			name: 'deck-slug-field', 
			className:'deck-slug-field full-width input-field',
			label: 'Slug', 
			onKeyUp: function(e){ 
				$(e.currentTarget).val($(e.currentTarget).val().toLowerCase().replace(/ +/g,'-').replace(/[^\w-]+/g,''));	
			}
		},
		{
			id: 3, 
			type: 'text', 
			name: 'deck-hashtags-field', 
			className:'deck-hashtags-field full-width input-field',
			label: 'Hashtags'
		},
		{
			id: 4, type: 'checkbox', label: 'Sync With Slides.com', name: 'use-slides-field'
		},
		{id: 5, type: 'submit', value: 'Create Deck'}
	],
	className: 'create-deck-form',
	onSubmit: function(e){
		e.preventDefault();
		var deckAttributes = {
			title: $(e.currentTarget).find('[name=deck-title-field]').val(),
			slug: $(e.currentTarget).find('[name=deck-slug-field]').val(),
			hashtags: $(e.currentTarget).find('[name=deck-hashtags-field]').val().split(','),
			withSlides: $(e.currentTarget).find('[name=use-slides-field]').get(0).checked,
			author: Meteor.userId()
		};

		_.each(deckAttributes.hashtags, function(hashtag, index){
			deckAttributes.hashtags[index] = hashtag.trim();
		})
		
		Meteor.call('createDeck', deckAttributes, function(error,result){
			if (error){
				alert(error);
			} else {
				$('.close-modal-btn').click();
				Router.go('/' + Meteor.user().username + '/' + deckAttributes.slug);
			}
		});
	}
};


editDeckForm = {
	className: 'edit-deck-form',
	fields: [
		{
			id: 1, 
			type: 'text', 
			name: 'deck-title-field', 
			className:'full-width input-field', 
			label: 'Deck Title',
			onKeyUp: function(e){  
				$('.deck-slug-field').val($(e.currentTarget).val().toLowerCase().replace(/ +/g,'-').replace(/[^\w-]+/g,''));	
			}
		},
		{
			id: 2, 
			type: 'text', 
			name: 'deck-slug-field', 
			className:'deck-slug-field full-width input-field',
			label: 'Slug', 
			onKeyUp: function(e){ 
				$(e.currentTarget).val($(e.currentTarget).val().toLowerCase().replace(/ +/g,'-').replace(/[^\w-]+/g,''));	
			}
		},
		{
			id: 3, 
			type: 'text', 
			name: 'deck-description-field', 
			className:'deck-description-field full-width input-field',
			label: 'Description'
		},
		{
			id: 4, 
			type: 'text', 
			name: 'deck-hashtags-field', 
			className:'deck-hashtags-field full-width input-field',
			label: 'Hashtags'
		},
		{id: 5, type: 'checkbox', label: 'Sync With Slides.com', name: 'use-slides-field'},
		{id: 6, type: 'checkbox', label: 'Make Private', name: 'is-private-field'},
		{id: 7, type: 'submit', value: 'Save Deck'}
	],
	onSubmit: function(e){
		e.preventDefault();

		var deckID = editDeckForm.data._id;

		var deckAttributes = {
			title: $(e.currentTarget).find('[name=deck-title-field]').val(),
			slug: $(e.currentTarget).find('[name=deck-slug-field]').val(),
			description: $(e.currentTarget).find('[name=deck-description-field]').val(),
			isPrivate: $(e.currentTarget).find('[name=is-private-field]').get(0).checked,
			withSlides: $(e.currentTarget).find('[name=use-slides-field]').get(0).checked,
			hashtags: $(e.currentTarget).find('[name=deck-hashtags-field]').val().split(','),
			author: Meteor.userId()
		}

		_.each(deckAttributes.hashtags, function(hashtag, index){
			deckAttributes.hashtags[index] = hashtag.trim();
		})

		Meteor.call('editDeck', deckID, deckAttributes, function(error){
			if (error){
				alert(error);
			} else {
				$('.close-modal-btn').click();
			}	
		})
	}
};

newQuoteForm = {
	className: 'add-quote-form',
	fields: [
		{id: 1, type: 'textarea', name: 'quote-text-field', className:'full-width', placeholder: 'Enter Quote Here', rows: 8},
		{id: 2, type: 'text', visibility: 'hidden', name: 'quote-slide-field', className:'full-width input-field', label: 'Slides.com Slide'},
		{id: 3, type: 'text', name: 'quote-order-field', className:'full-width input-field', label: 'Order'},
		{id: 4, type: 'submit', value: 'Add Quote'}
	],	
	onSubmit: function(e){
		e.preventDefault();

		var deckId = newQuoteForm.data._id;

		var quoteAttributes = {
			text: $(e.currentTarget).find('[name=quote-text-field]').val(),
			slide: $(e.currentTarget).find('[name=quote-slide-field]').val(),
			order: $(e.currentTarget).find('[name=quote-order-field]').val()
		}

		var eventId = Router.current().params._id;

		Meteor.call('addQuote', deckId, quoteAttributes, function(error){
			if (error){
				alert(error) 
			} else {
				$('.close-modal-btn').click();
			}
		})
	}
};

editQuoteForm = {
	className: 'edit-quote-form',
	fields: [
		{id: 1, type: 'textarea', name: 'quote-text-field', className:'full-width', placeholder: 'Enter Quote Here', rows: 8},
		{id: 2, type: 'text', visibility: 'hidden', name: 'quote-slide-field', className:'full-width input-field', label: 'Slides.com Slide'},
		{id: 3, type: 'text', name: 'quote-order-field', className:'full-width input-field', label: 'Order'},
		{id: 4, type: 'submit', value: 'Save Quote'}
	],	
	onSubmit: function(e){
		e.preventDefault();

		var quoteID = editQuoteForm.data._id;
		var deckID = editQuoteForm.data.deckId;
		var quoteAttributes = {
			text: $(e.currentTarget).find('[name=quote-text-field]').val(),
			slide: $(e.currentTarget).find('[name=quote-slide-field]').val(),
			order: $(e.currentTarget).find('[name=quote-order-field]').val()
		}

		Meteor.call('editQuote', quoteID, deckID, quoteAttributes, function(error){
			if (error){
				alert(error);
			} else {
				$('.close-modal-btn').click();
			}	
		})
	}
};

searchForm = {
	className: 'search-form',
	fields: [
		{
			id: "query",
			name: "query",
			type: "text",
			className: "search-bar full-width input-field",
			label: "Search"// error - label doesn't go away when typing stuff in search form
		},
		{
			id: "authorCheck",
			name: "authorCheck",
			type: "checkbox",
			className: "checkbox-control full-width input-field",
			label: "Author"
		},
		{
			id: "hashtagCheck",
			name: "hashtagCheck",
			type: "checkbox",
			className: "checkbox-control full-width input-field",
			label: "Hashtag"
		},
		{
			id: "deckNameCheck",
			name: "deckNameCheck",
			type: "checkbox",
			className: "checkbox-control full-width input-field",
			label: "Deck Name",
			checked: true
		},
		{
			id: "submitSearch",
			name: "submitSearch",
			type: "submit",
			className: "submit-search-bar",
		}//todo - add checkboxes for filtering
	],
	onSubmit: function(e){
		e.preventDefault()
		console.log(e)
		var query = $(e.target).find('[name="query"]').val()

		var settings = ""

		$('[type="checkbox"]').each(function(i, e){
			settings += (e.checked ? 1 : 0)
		})


		if(!query)
			return Errors.throw('Please enter a search query', 'error')
		if(settings.indexOf("1") == -1)
			return Errors.throw('Please select something to search by', 'error')

		var encodedQuery = encodeURIComponent(query)

		Router.go('/search/' + encodedQuery)
		Session.set('searchSettings', settings)
	}
}

loginFormAttributes = {
	fields: [
		{type: 'text', label: 'username', name: 'username',  className:'full-width input-field'},
		{type: 'password', label:"password",  className:'full-width input-field', name: 'password'},
		{type: 'submit', value: 'Login', className: 'full-width'}
	],
	type: 'login',
	animateIn: false,
	className: 'login-form center-form tight-form',
	onSubmit: function(e){
		e.preventDefault();

		var userName = $(e.target).find('[name="username"]').val();
		var password = $(e.target).find('[name="password"]').val();

		if (!userName){
			Errors.throw('Please enter a username', 'error');
			return false;
		}

		if (!password){
			Errors.throw('Please enter a password', 'error');
			return false;
		}

		Meteor.loginWithPassword(userName, password, function(error, result){
			if (error)
				Errors.throw(error.reason, 'error')
			else{
				Session.set('loggedIn', true);
				AnimatePageOut('loginPage');

				Meteor.setTimeout(function(){
					Router.go('/' + userName);
				}, 500);
			}
		})
	}
};

registerFormAttributes = {
	fields: [
		{type: 'text', label: 'Username', name: 'username', className:'full-width input-field'},
		{type: 'email', label: 'Email', name: 'email', className:'full-width input-field'},
		{type: 'password', label:"password", name: 'password', className:'full-width input-field'},
		{type: 'password', label:"confirm-password", name: 'confirm-password', className:'full-width input-field'},
		{type: 'submit', value: 'Register'}
	],
	className: 'login-form',
	onSubmit: function(e){
		e.preventDefault();

		var user = {
			username: $(e.target).find('[name="username"]').val(),
			email: $(e.target).find('[name="email"]').val(),
			password: $(e.target).find('[name="password"]').val(),
		}

		var passwordConfirm = $(e.target).find('[name="confirm-password"]').val();

		if (!user.username)
			Errors.throw("Please enter a username.", 'error');

		else if (!user.email)
			Errors.throw("Please enter an email address.", 'error');

		else if (!user.password)
			Errors.throw("Please enter a password.", 'error');

		else if (user.password.length < 6)
			Errors.throw("Passwords is less that 6 character.", 'error');

		else if (user.password != passwordConfirm){
			Errors.throw("Passwords do not match.", 'error');
		}

		else (
			Accounts.createUser({email: user.email, password: user.password, username: user.username }, function(error){
				if (error){
					Errors.throw(error.reason, 'error');
				}
				else {
					Meteor.setTimeout(function(){
						Session.set('loggedIn', true);
						Router.go('/');
					}, 500);
				}
			})
		)
	}
};

profileFormAttributes = {
	className: 'profile-form',
	fields: [
		{
			id: 1, 
			type: 'text', 
			name: 'name-field', 
			className:'full-width input-field', 
			label: 'Name'
		},
		{
			id: 2, 
			type: 'text', 
			name: 'username-field', 
			className:'full-width input-field', 
			label: 'Username'
		},
		{
			id: 3, 
			type: 'email', 
			name: 'email-field', 
			className:'full-width input-field',
			label: 'email'
		},
		{id: 4, type: 'submit', value: 'Save Profile'}
	],
	onSubmit: function(e){
		e.preventDefault();
		
		var userProfile = {
			name: $(e.currentTarget).find('[name=name-field]').val(),
			avatar: $('.user-avatar').attr('src')
		};

		var userBase = {
			username: $(e.currentTarget).find('[name=username-field]').val(),
			email: $(e.currentTarget).find('[name=email-field]').val(),
		}

		Meteor.call('updateUserProfile', userProfile, userBase, function(error){
			if (error){
				alert(error);
			} else {
				alert('saved!');
			}	
		})
	}
};