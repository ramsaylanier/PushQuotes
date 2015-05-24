LoginPage = React.createClass({
	randomFunction: function(){

	},
	render: function(){
		return (
			<div className="wrapper form-wrapper tight-form-wrapper">
				<Form attributes={loginFormAttributes} />
				<p>No account? <a href='/register'>Register</a></p>
			</div>
		)
	}
})


Template.loginPage.onRendered(function(){
	React.render(
		<LoginPage />,
		document.getElementById('login-page')
	)
})