Template.landingPage.onRendered(function(){
	var animateOut = _.extend(DefaultPageAnimateOut,{options: {duration: 1000, easing:[300, 15],delay: 0}});

	Session.set('animateOut', animateOut);
	Session.set('currentPageTitle', 'landingPage');

	React.render(
		<Page animateIn={DefaultPageAnimateIn}>
			<PageHeader backgroundImage={'/img/home-bg.jpg'}>
				<PageTitle>Push<span style={{color:Colors.primary}}>Quotes</span></PageTitle>
			</PageHeader>
		</Page>,
		document.getElementById('main')
	)
});

Template.landingPage.onDestroyed(function(){
	React.unmountComponentAtNode(document.getElementById('main'));
});