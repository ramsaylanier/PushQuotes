QuoteItem = React.createClass({
	componentDidMount: function(){
		var itemCount = Session.get('quoteCount');
		var item = this.getDOMNode(this.refs.deckListItem);
		$(item).velocity({
			opacity: 1,
			translateY: [0, 20]
		}, {duration: 1000, easing: [300, 20], delay: itemCount * 50});
		Session.set('quoteCount', itemCount + 1);
	},
	componentWillUnmount: function(){
		var item = this.getDOMNode(this.refs.deckListItem);
		$(item).velocity({
			opacity: 0,
			translateY: [20, 0]
		}, {duration: 1000, easing: [300, 20]});
	},
	renderEditModal: function(){
		var modal = document.createElement('div');
		$(modal).addClass('modal edit-quote-modal');
		document.body.appendChild(modal);

		editQuoteForm.data = this.props;
		editQuoteForm.fields[0].value = this.props.text;

		React.render(
			<Modal>
				 <Form attributes={editQuoteForm} />
			</Modal>,
			modal
		)
	},
	deleteForm: function(){
		var confirmDelete = confirm('Do you want to delete this quote?');

		if (confirmDelete){
			var quoteID = this.props._id;
			var deckID = this.props.deckId;

			Meteor.call('deleteQuote', quoteID, deckID, function(error){
				if (error){
					alert(error)
				} else {

				}
			})
		}
	},
	actions: function(){
		var actions = [
			{name: 'Edit', icon: EditIcon, action: this.renderEditModal},
			{name: 'Delete', icon: DeleteIcon, action: this.deleteForm}
		]

		return actions;
	},
	render: function(){
		var isAuthor = (Meteor.userId() == Decks.findOne().author ? true : false);
		var isLive = this.props.isLive;
		var isPrivate = this.props.isPrivate;
		return (
			<li ref="quoteListItem" className="quote-item item">
				<p className="quote-text">"{this.props.text}"</p>
				<div className="action-list">
					{isPrivate && !isLive ? <span className="is-private">private</span> : null}
					{isAuthor && !isLive ? <DeckActions actions={this.actions()}/> : null }
					{isLive ? <QuoteActions quote={this.props.text} hashtags={this.props.hashtags} />: null}
				</div>
			</li>
		)
	}
});