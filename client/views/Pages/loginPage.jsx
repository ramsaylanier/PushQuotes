Template.loginPage.onRendered(function(){

	var animateOut = _.extend(DefaultPageAnimateOut,{options: {duration: 1000, easing:[300, 15],delay: 0}});

	Session.set('animateOut', animateOut);
	Session.set('currentPageTitle', 'loginPage');

	React.render(
		<Page animateIn={DefaultPageAnimateIn} backgroundImage={'/img/login-bg.jpg'}>
			<Wrapper type="form-wrapper" centered={true} backgroundColor="white">
				<Form attributes={loginFormAttributes} />
				<p>No account? <Link href='/register' className="transition-link">Register</Link></p>
			</Wrapper>
		</Page>,
		document.getElementById('main')
	);
});

Template.loginPage.onDestroyed(function(){
	React.unmountComponentAtNode(document.getElementById('main'));
});
