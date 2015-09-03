RegisterPage = React.createClass({
	render(){
		return(
			<Page animateIn={DefaultPageAnimateIn} backgroundImage={'/img/login-bg.jpg'}>
				<div className="wrapper form-wrapper white-bg">
					<Form attributes={registerFormAttributes} />
				</div>
			</Page>
		)
	}
});