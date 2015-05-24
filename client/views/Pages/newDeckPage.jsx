Template.newDeckPage.onRendered(function(){

	React.render(
		<div className="wrapper">
			<Form attributes={newDeckForm} />
		</div>,
		document.getElementById('new-deck-page')
	)
})