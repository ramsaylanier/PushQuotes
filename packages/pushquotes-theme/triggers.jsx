Triggers = {
	AddDeck:function(){
		var modal = $('<div class="modal new-deck-modal"></div>');
		$('main').append(modal);

		React.render(
			<Modal>
				<Form attributes={newDeckForm} />
			</Modal>,
			modal.get(0)
		)
	},
	EditDeck: function(props){
		$('.page').addClass('edit-mode');

		var modal = $('<div class="modal edit-deck-modal"></div>');
		$('main').append(modal);

		if (props){
			editDeckForm.fields[0].value = props.title;
			editDeckForm.fields[1].value = props.slug;
			editDeckForm.fields[2].value = props.description;
			editDeckForm.fields[3].value = props.hashtags;
			editDeckForm.fields[4].value = props.image;
			editDeckForm.fields[5].checked = props.withSlides;
			editDeckForm.data = props;
		}

		React.render(
			<Modal>
				 <Form attributes={editDeckForm}/>
				 <div className="flex-container items-centered space-between no-margin">
					 <DuplicateDeckButton deck={props}/>
					 <DeleteDeckButton deck={props}/>
				 </div>
			</Modal>,
			modal.get(0)
		)
	},
	StartPresentation: function(deckId){
		TweenMax.to(window, .25, {scrollTo: {y: 0}});

		Meteor.setTimeout(function(){
			Meteor.call('goLive', deckId, function(err, res){
				if (err){
					alert(err)
				} else {

				}
			})
		}, 250);
	},
	EndPresentation: function(deckId){
		Meteor.call('endLive', deckId, function(err, res){
			if (err){
				alert(err)
			} else {

			}
		})
	},
	AddQuote: function(){
		var modal = $('<div class="modal new-deck-modal"></div>');
		$('main').append(modal);

		newQuoteForm.fields[2].value = Quotes.find().count() + 1;

		React.render(
			<Modal>
				<Form attributes={newQuoteForm} />
			</Modal>,
			modal.get(0)
		)
	},
	EditQuote: function(props){
		var modal = $('<div class="modal edit-quote-modal"></div>');
		$('main').append(modal);

		React.render(
			<Modal>
				 <Form attributes={editQuoteForm} />
				  <div className="flex-container items-centered space-between no-margin">
					 <DeleteQuoteButton quote={props} />
				 </div>
			</Modal>,
			modal.get(0)
		)
	}
}