Template.search.onRendered(function(){

	React.render(
		<Wrapper type="form-wrapper" centered={true} backgroundColor="white">
			<Form attributes={searchForm} />
		</Wrapper>
		,
		document.getElementById('search-page')
	)

})

Template.search.onDestroyed(function(){
	React.unmountComponentAtNode(document.getElementById('search-page'));
});