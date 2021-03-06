viewPresentationForm = {
	fields: [
		{
			id: 1, 
			type: 'text', 
			name: 'presentation-key-field', 
			className:'full-width input-field', 
			label:'Presentation Key'
		},
		{
			id: 2,
			type: 'submit',
			value: 'View Presentation'
		}
	],
	className: 'view-presentation-form',
	onSubmit: function(e){
		e.preventDefault();
		var presentationKey = $(e.currentTarget).find('[name=presentation-key-field]').val();

		Meteor.call('viewPresentation', presentationKey, function(err, res){
			if(err){
				Alerts.throw(err, 'error')
			} else {
				FlowRouter.go('/' + res)
			}
		})
	}
}

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
			label: 'Unique Access Code', 
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
			hashtags: $(e.currentTarget).find('[name=deck-hashtags-field]').val(),
			withSlides: $(e.currentTarget).find('[name=use-slides-field]').get(0).checked,
			author: Meteor.userId()
		};

		
		Meteor.call('createDeck', deckAttributes, function(error,result){
			if (error){
				Alerts.throw(error, 'error');
			} else {
				$('.close-modal-btn').click();
				FlowRouter.go('/' + Meteor.user().username + '/' + deckAttributes.slug);
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
			label: 'Unique Access Form', 
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
		{
			id: 5, 
			type: 'url', 
			name: 'deck-image-field', 
			className:'deck-image-field full-width input-field',
			label: 'URL of Image'
		},
		{id: 6, type: 'checkbox', label: 'Sync With Slides.com', name: 'use-slides-field'},
		{id: 7, type: 'submit', value: 'Save', className: 'full-width'}
	],
	onSubmit: function(e){
		e.preventDefault();

		var deckID = editDeckForm.data._id;

		var deckAttributes = {
			title: $(e.currentTarget).find('[name=deck-title-field]').val(),
			slug: $(e.currentTarget).find('[name=deck-slug-field]').val(),
			description: $(e.currentTarget).find('[name=deck-description-field]').val(),
			withSlides: $(e.currentTarget).find('[name=use-slides-field]').get(0).checked,
			hashtags: $(e.currentTarget).find('[name=deck-hashtags-field]').val(),
			image: $(e.currentTarget).find('[name=deck-image-field]').val(),
			author: Meteor.userId()
		}

		_.each(deckAttributes.hashtags, function(hashtag, index){
			deckAttributes.hashtags[index] = hashtag.trim();
		})

		Meteor.call('editDeck', deckID, deckAttributes, function(error){
			if (error){
				Alerts.throw(error, 'error');
			} else {
				$('.close-modal-btn').click();

				//Check to see if there is an existing slug. If so, that means we are on the deck view page.
				var currentSlug = FlowRouter.getParam('slug');

				//If on the deck view page, reroute to new slug if the slug has changed to prevent router/rendering errors.
				if (currentSlug){
					FlowRouter.go('/' + FlowRouter.getParam('username') + '/' + deckAttributes.slug);
				}
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

		var deckId = Decks.findOne({slug: FlowRouter.getParam('slug')})._id;

		var quoteAttributes = {
			text: $(e.currentTarget).find('[name=quote-text-field]').val(),
			slide: $(e.currentTarget).find('[name=quote-slide-field]').val(),
			order: $(e.currentTarget).find('[name=quote-order-field]').val()
		}

		Meteor.call('addQuote', deckId, quoteAttributes, function(error){
			if (error){
				Alerts.throw(error, 'error');
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
		{id: 4, type: 'submit', className:"full-width", value: 'Save Quote'}
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
				Alerts.throw(error, 'error');
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
			id: "authorName",
			name: "authorName",
			type: "checkbox",
			className: "checkbox-control full-width input-field",
			label: "Author"
		},
		{
			id: "hashtags",
			name: "hashtags",
			type: "checkbox",
			className: "checkbox-control full-width input-field",
			label: "Hashtag"
		},
		{
			id: "title",
			name: "title",
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

		var settings = "?"

		$('[type="checkbox"]').each(function(i, e){
			console.log(e)
			settings += (e.checked ? e.id + "&": "")
		})

		settings = settings.substring(0, settings.length - 1)
		

		if(!query)
			Alerts.throw('Please enter a search query', 'error');
		if(settings.length == 0)
			Alerts.throw('Please select something to search by', 'error');

		var encodedQuery = encodeURIComponent(query)
		console.log('/search/' + encodedQuery + settings)
		FlowRouter.go('/search/' + encodedQuery + settings)
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
	className: 'login-form center-form tight-form white-bg',
	onSubmit: function(e){
		e.preventDefault();

		var userName = $(e.target).find('[name="username"]').val();
		var password = $(e.target).find('[name="password"]').val();

		if (!userName){
			Alerts.throw('Please enter a username', 'error');
			return false;
		}

		if (!password){
			Alerts.throw('Please enter a password', 'error');
			return false;
		}

		Meteor.loginWithPassword(userName, password, function(error, result){
			if (error)
				Alerts.throw(error, 'error')
			else{
				AnimateItem($('.page'), PageAnimations.animateOut)

				Meteor.setTimeout(function(){
					FlowRouter.go('/' + userName);
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
			Alerts.throw("Please enter a username.", 'error');

		else if (!user.email)
			Alerts.throw("Please enter an email address.", 'error');

		else if (!user.password)
			Alerts.throw("Please enter a password.", 'error');

		else if (user.password.length < 6)
			Alerts.throw("Passwords is less that 6 character.", 'error');

		else if (user.password != passwordConfirm){
			Alerts.throw("Passwords do not match.", 'error');
		}

		else (
			Accounts.createUser({email: user.email, password: user.password, username: user.username }, function(error){
				if (error){
					Alerts.throw(error.reason, 'error');
				}
				else {
					Meteor.setTimeout(function(){
						Session.set('loggedIn', true);
						FlowRouter.go('/');
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
			label: 'Email'
		},
		{id: 4, type: 'submit', value: 'Save Profile'}
	],
	onSubmit: function(e){
		e.preventDefault();

		var username = $(e.currentTarget).find('[name=username-field]').val()
		
		var userProfile = {
			name: username,
			avatar: $('.user-avatar').attr('src')
		};

		var userBase = {
			username: username,
			email: $(e.currentTarget).find('[name=email-field]').val(),
		}

		Meteor.call('updateUserProfile', userProfile, userBase, function(error, result){
			if (error){
				Alerts.throw(error, 'error');
			} else {
				var container = $('.edit-profile-container');
				SlideHideContent(container);
				Alerts.throw('saved!', 'success');
				FlowRouter.go('/' + username);
			}	
		})
	}
};

forgotPasswordFormAttributes = {
	className: 'forgot-password-form',
	fields: [
		{
			id: 1, 
			type: 'email', 
			name: 'email-field', 
			className:'full-width input-field', 
			label: 'Email Address'
		},
		{id: 2, type: 'submit', value: 'Resend Password'}
	],
	onSubmit: function(e){
		e.preventDefault();
		
		var email = $(e.currentTarget).find('[name=email-field]').val()


		Meteor.call('resendUserPassword', email, function(error){
			if (error){
				Alerts.throw(error, 'error');
			}
		})
	}
};