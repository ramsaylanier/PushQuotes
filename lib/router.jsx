FlowRouter.route('/', {
	triggersEnter: [function(context, redirect){
		if (!Meteor.userId()){
			redirect('/login');
		}
	}],
	action: function(){
		ReactLayout.render(MainLayout, {
			content: <DashboardPage/>
		})
	}
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
			noHeader: true,
			content: <RegisterPage/>
		})
	}
})

FlowRouter.route('/:username/:slug', {
	action: function(params){
		ReactLayout.render(MainLayout, {
			content: <DeckPage/>
		})
	}
})

FlowRouter.route('/:username', {
	action: function(params){
		ReactLayout.render(MainLayout, {
			content: <DashboardPage/>
		})
	}
})

