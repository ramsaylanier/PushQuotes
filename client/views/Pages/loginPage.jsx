Template.loginPage.helpers({
	LoginPage: function(){
		return LoginPage;
	}
})

LoginPage = React.createClass({
	render(){
		return (
			<Page animateIn={DefaultPageAnimateIn} backgroundImage={'/img/login-bg.jpg'} wrapper={'form-wrapper white-bg'}>
				<div className="wrapper form-wrapper white-bg">
					<Form attributes={loginFormAttributes}/>
					<button onClick={twitterLogin} className="btn twitter-btn full-width">Login With Twitter</button>  
					<p>No account? <Link href='/register' className="transition-link">Register</Link></p>

					<Link className="small render-form" onClick={renderForgotPasswordForm}>Forgot password</Link>
				</div>
			</Page>
		)
	}
})

Template.loginPage.onRendered(function(){

	var animateOut = _.extend(DefaultPageAnimateOut,{options: {duration: 1000, easing:[300, 15],delay: 0}});

	Session.set('animateOut', animateOut);
	Session.set('currentPageTitle', 'loginPage');
});

// Template.loginPage.onDestroyed(function(){
// 	React.unmountComponentAtNode(document.getElementById('main'));
// });

var renderForgotPasswordForm = function(e){
	e.preventDefault();

	$('.page .wrapper').append('<div id="forgot-password-form-wrapper"></div>');

	React.render(
		<div>
			<Form attributes={forgotPasswordFormAttributes} />
		</div>,
		document.getElementById('forgot-password-form-wrapper')
	);
}


var twitterLogin = function(){
	var loginStyle = 'popup';
	var device = Session.get('device');

	Meteor.loginWithTwitter({loginStyle: loginStyle}, function(error, result){
		if (error){
			Errors.throw(error, 'error');
			console.log(error);
		}
		else{
			Router.go('/');
		}	
	});
}
