LoginPage = React.createClass({
	render(){
		return (
			<Page backgroundImage={'/img/login-bg.jpg'}>
				<PageContent>
					<div className="wrapper form-wrapper white-bg">
						<Form attributes={loginFormAttributes}/>
						<button onClick={twitterLogin} className="btn twitter-btn full-width">Login With Twitter</button>  
						<p>No account? <Link href='/register' className="transition-link">Register</Link></p>

						<Link className="small render-form" onClick={renderForgotPasswordForm}>Forgot password</Link>
					</div>

					<div className="wrapper form-wrapper white-bg">
						<Form attributes={viewPresentationForm}/>
					</div>
				</PageContent>
			</Page>
		)
	}
});

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
			Alerts.throw(error, 'error');
		}
		else{
			FlowRouter.go('/' + Meteor.user().username);
		}	
	});
}
