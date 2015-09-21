FlowRouter.route('/', {
	triggersEnter: [function(context, redirect){
		if (!Meteor.user()){
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

FlowRouter.route('/:username', {
	name: 'dashboardRoute',
	action: function(params){
		ReactLayout.render(MainLayout, {
			content: <div><DashboardPage/><TriggerModalToggle trigger={Triggers.AddDeck} /></div>
		})
	}
})


FlowRouter.route('/:username/:slug', {
	name: 'deckSingle',
	action: function(params){
		ReactLayout.render(MainLayout, {
			content: <DeckPage/>
		})
	}
})

FlowRouter.route('/:username/:slug/live', {
	name: 'deckLive',
	action: function(params){
		ReactLayout.render(MainLayout, {
			content: <DeckLive/>
		})
	}
})

