RegisterPage = React.createClass({
	render(){
		return(
			<Page backgroundImage={'/img/login-bg.jpg'}>
				<PageContent>
					<div className="wrapper form-wrapper white-bg">
						<Form attributes={registerFormAttributes} />
					</div>
				</PageContent>
			</Page>
		)
	}
});
