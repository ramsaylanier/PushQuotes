Card = React.createClass({
	componentDidMount: function(){
		var self = this;
		var itemCount = Session.get('itemCount');
		var item = this.getDOMNode();
		Meteor.setTimeout(function(){

			TweenMax.fromTo(item, 1, {
				opacity: 0,
				y: 20
			}, {
				opacity: 1,
				y: 0,
				ease: Power2.easeOut,
				delay: (itemCount * .05)
			});
		}, 0)

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
		editDeckForm.fields[4].value = this.props.image;
		editDeckForm.fields[5].checked = this.props.withSlides;
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

		if (this.props.withSlides){
			newQuoteForm.fields[1].visibility = 'visible'
		} else {
			newQuoteForm.fields[1].visibility = 'hidden'
		}

		React.render(
			<Modal>
				 <Form attributes={newQuoteForm} />
			</Modal>,
			modal
		)
	},
	toggleLive: function(){
		var authorName = this.props.authorName;
		var deckSlug = this.props.slug;

		Meteor.call('updateLive', authorName, deckSlug, function(error, isLive){
			if (error){
				alert(error);
			}
		});
	},
	actions: function(){
		var actions = [
			{name: 'Edit', icon: EditIcon, action: this.renderEditModal},
			{name: 'Delete', icon: DeleteIcon, action: this.deleteForm},
			{name: 'Duplicate', icon: DeleteIcon, action: this.duplicateDeck},
		]

		// if (this.props.live){
		// 	actions.push({name: 'End Live', icon: StopIcon, action: this.toggleLive})
		// } else {
		// 	actions.push({name: 'Go Live', icon: PlayIcon, action: this.toggleLive})
		// }

		return actions;
	},
	handleClick: function(e){
		console.log(e);
		var link = "/" + this.props.authorName + '/' + this.props.slug;
		Router.go(link);
	},
	render: function(){
		var isAuthor = Meteor.userId() == this.props.author;
		var hashtags = this.props.hashtags;

		var backgroundImage = {
			backgroundImage: "url('" + this.props.image + "')"
		};
		
		return (
			<li className="card flex-container">
				{this.props.image && 
					<div className="card-image flex-1" style={backgroundImage}>
						
					</div>
				}

				<div className="card-details flex-1">

					<CardTitle link={"/" + this.props.authorName + '/' + this.props.slug} classes="transition-link">
						{this.props.title}	
					</CardTitle>

					<div className="deck-hashtags section-item">
						<Hashtags hashtags={this.props.hashtags}/>
					</div>

					{this.props.showAuthor && <p className="deck-author">
						<a 
							href={"/" + this.props.authorName} 
							className="transition-link">

							By {this.props.authorName}

						</a>
					</p>}
				</div>

				{isAuthor && <CardActions actions={this.actions()}/>}

				{this.props.favorites && this.props.quotes && this.props.quotes.length > 0 && 
					<div class="nested-quote-list favorite-quote-list">
						<QuoteList favorites={true} deckId={this.props._id} isLive={this.props.live}/>
					</div>
				}
			</li>
		)
	}
});