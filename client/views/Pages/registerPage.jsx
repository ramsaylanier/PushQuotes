Template.registerPage.onRendered(function(){

	var animateOut = _.extend(DefaultPageAnimateOut,{options: {duration: 1000, easing:[300, 15],delay: 0}});

	Session.set('animateOut', animateOut);
	Session.set('currentPageTitle', 'registerPage');

	React.render(
		<Page animateIn={DefaultPageAnimateIn} backgroundImage={'/img/login-bg.jpg'}>
			<Wrapper type="form-wrapper" centered={true} backgroundColor="white">
				<Form attributes={registerFormAttributes} />
			</Wrapper>
		</Page>,
		document.getElementById('main')
	)
})


Template.registerPage.onDestroyed(function(){
	React.unmountComponentAtNode(document.getElementById('main'));
});