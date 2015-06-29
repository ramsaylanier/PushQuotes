Template.search.onRendered(function(){

	React.render(
		<Page animateIn={PageSlideIn}>
			<Wrapper type="form-wrapper" centered={true} backgroundColor="white">
				<Form attributes={searchForm} />
			</Wrapper>
		</Page>
		,
		document.getElementById('main')
	)

})

Template.search.onDestroyed(function(){
	React.unmountComponentAtNode(document.getElementById('main'));
});