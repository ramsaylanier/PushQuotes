DeckItem = React.createClass({
	componentDidMount: function(){
		var itemCount = Session.get('itemCount');
		var item = this.getDOMNode();

		$(item).velocity({
			opacity: 1,
			translateY: [0, 20]
		}, {duration: 1000, easing: [300, 15], delay: (itemCount * 50)});

		Session.set('itemCount', itemCount + 1);
	},
	renderEditModal: function(){
		var modal = document.createElement('div');
		$(modal).addClass('modal edit-deck-modal');
		document.body.appendChild(modal);

		editDeckForm.fields[0].value = this.props.title;
		editDeckForm.fields[1].value = this.props.slug;
		editDeckForm.fields[2].value = this.props.description;
		editDeckForm.fields[3].value = this.props.hashtags;
		editDeckForm.fields[4].checked = this.props.isPrivate;
		editDeckForm.data = this.props;

		React.render(
			<Modal>
				 <Form attributes={editDeckForm} />
			</Modal>,
			modal
		)
	},
	deleteForm: function(){
		var confirmDelete = confirm('Do you want to delete this deck?');

		if (confirmDelete){
			var formId = this.props._id;

			Meteor.call('deleteForm', formId, function(error){
				if (error){
					alert(error)
				} else {
					Router.go('/');
				}
			})
		}
	},
	renderQuoteForm: function(e){
		e.stopPropagation();
		var modal = document.createElement('div');
		$(modal).addClass('modal create-quote-modal');
		document.body.appendChild(modal);

		newQuoteForm.data = this.props;

		React.render(
			<Modal>
				 <Form attributes={newQuoteForm} />
			</Modal>,
			modal
		)
	},
	toggleLive: function(){
		var authorName = Router.current().params.username;
		var deckSlug = this.props.slug;

		Meteor.call('updateLive', authorName, deckSlug, function(error, isLive){
			if (error){
				alert(error);
			}
		});
	},
	actions: function(){
		var actions = [
			{name: 'edit', icon: EditIcon, action: this.renderEditModal},
			{name: 'delete', icon: DeleteIcon, action: this.deleteForm},
			{name: 'create-quote', icon: PlusIcon, action: this.renderQuoteForm},
		]

		if (this.props.live){
			actions.push({name: 'End Live', icon: StopIcon, action: this.toggleLive})
		} else {
			actions.push({name: 'Go Live', icon: PlayIcon, action: this.toggleLive})
		}

		return actions;
	},
	render: function(){
		var isAuthor = (Meteor.userId() == this.props.author ? true : false);
		var isPrivate = this.props.isPrivate || false;
		var hashtags = this.props.hashtags;

		return (
			<li className={(this.props.live ? 'is-live ' : '') + "deck-item item"} >
				<Section className="deck-header deck-section">
					<h1 className="deck-title">
						<a href={"/" + this.props.authorName + '/' + this.props.slug} className="transition-link">{this.props.title}</a>						
					</h1>
					<p className="deck-description">{this.props.description}</p>
				</Section>

				{this.props.live ?
					<Section className="deck-section">
						<Link color="white" bg="greenBg" size="large" type="button" block={true} href={'/' + this.props.authorName + '/' + this.props.slug + '/live'} className="live-link transition-link">View Live</Link>
					</Section> :
					null 
				}

				<Section className="deck-details deck-section">

					{this.props.hashtags ? 
						<div className="deck-hashtags section-item">
							<DeckHashtags>{this.props.hashtags}</DeckHashtags> 
						</div>: 
						null
					}
				</Section>


				<Section className="deck-footer deck-section">
					<div className="deck-meta">
						<Count count={this.props.quotes.length} name="Quotes" icon={QuoteIcon} />
						{isPrivate ? <span className="is-private meta-item">private</span> : null}
					</div>

					<div className="action-list">
						{isAuthor ? <DeckActions actions={this.actions()}/>: null}
					</div>
				</Section>
			</li>
		)
	}
});

Section = React.createClass({
	render: function(){
		return (
			<section className={this.props.className}>
				{this.props.children}
			</section>
		)
	}
})

DeckActions = React.createClass({
	render: function(){
		var actions = this.props.actions;
		return (
			<ul className="deck-actions-list">
				{actions.map(function(action){
					var icon = action.icon || null;
					return (
						<li key={action.name} className={"deck-action-item " + action.name.toLowerCase().replace(/ +/g, '-') + '-action'}>
							<a href={action.href} onClick={action.action}>
								{icon ? action.icon : action.name }
							</a>
						</li>
					)
				})}
			</ul>
		)
	}
});



DeckHashtags = React.createClass({
	parseHashtags: function(){
		var arr = '';

		_.each(this.props.children, function(hashtag){
			arr = arr + ' #' + hashtag;
		});

		return arr;
	},
	render: function(){
		return (
			<span>
				{this.props.children.map(function(hashtag){
					return (
						<span className="hashtag">#{hashtag}</span>
					)
				})}
			</span>
		)
	}
})