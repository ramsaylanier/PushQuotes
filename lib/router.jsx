FlowRouter.notFound = {
	triggersEnter: [function(context, redirect){
		redirect('/');
	}],
    // Subscriptions registered here don't have Fast Render support.
    subscriptions: function() {

    },
    action: function() {

    }
};


FlowRouter.route('/', {
	triggersEnter: [function(context, redirect){
		if (!Meteor.userId()){
			redirect('/login');
		} else (
			redirect('/' + Meteor.user().username)
		)
	}]
})

FlowRouter.route('/login', {
	triggersEnter: [function(context, redirect){
		if (Meteor.userId()){
			redirect('/');
		} 
	}],
	action: function(){
		ReactLayout.render(MainLayout, {
			noHeader: true,
			content: <LoginPage/>
		})
	}
})

FlowRouter.route('/register', {
	action: function(){
		ReactLayout.render(MainLayout, {
			content: <RegisterPage/>
		})
	}
})

FlowRouter.route('/new-deck', {
	action: function(){
		ReactLayout.render(MainLayout, {
			content: <NewDeckPage/>
		})
	}
})


FlowRouter.route('/:username/:slug', {
	action: function(params){
		ReactLayout.render(MainLayout, {
			content: <div><DeckPage/><TriggerModalToggle trigger={Triggers.AddQuote} /></div>
		})
	}
})

FlowRouter.route('/:username', {
	action: function(params){
		ReactLayout.render(MainLayout, {
			content: <div><DashboardPage/><TriggerModalToggle trigger={Triggers.AddDeck} /></div>
		})
	}
})

