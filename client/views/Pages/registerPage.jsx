RegisterPage = React.createClass({
	render: function(){
		return (
			<div className="wrapper">
				<Form attributes={registerFormAttributes} />
				<p>No account? <a href='/register'>Register</a></p>
			</div>
		)
	}
})


Template.registerPage.onRendered(function(){
	React.render(
		<RegisterPage />,
		document.getElementById('register-page')
	)
})