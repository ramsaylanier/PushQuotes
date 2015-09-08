Triggers = {
	AddDeck:function(){
		var modal = document.createElement('div');
		$(modal).addClass('modal new-form-modal');
		document.body.appendChild(modal);

		React.render(
			<Modal>
				<Form attributes={newDeckForm} />
			</Modal>,
			modal
		)
	},
	AddQuote: function(){
		var modal = document.createElement('div');
		$(modal).addClass('modal new-form-modal');
		document.body.appendChild(modal);

		React.render(
			<Modal>
				<Form attributes={newQuoteForm} />
			</Modal>,
			modal
		)
	}
}