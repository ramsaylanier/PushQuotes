Template.registerPage.onRendered(function(){

	var animateOut = _.extend(DefaultPageAnimateOut,{options: {duration: 1000, easing:[300, 15],delay: 0}});

	Session.set('animateOut', animateOut);
	Session.set('currentPageTitle', 'registerPage');

	React.render(
		<Page animateIn={DefaultPageAnimateIn} backgroundImage={'/img/login-bg.jpg'}>
			<div className="wrapper form-wrapper white-bg">
				<Form attributes={registerFormAttributes} />
			</div>
		</Page>,
		document.getElementById('main')
	)
})


Template.registerPage.onDestroyed(function(){
	React.unmountComponentAtNode(document.getElementById('main'));
});