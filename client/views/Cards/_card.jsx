Card = React.createClass({
	componentDidMount(){
		let self = this;
		let itemCount = Session.get('itemCount');
		let item = this.getDOMNode();
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
	renderEditModal(){
		let item = this.getDOMNode();
		$(item).addClass('edit-mode');

		Triggers.EditDeck(this.props);
	},
	deleteForm(){
		let confirmDelete = confirm('Do you want to delete this deck?');

		if (confirmDelete){
			let formId = this.props._id;

			Meteor.call('deleteForm', formId, function(error){
				if (error){
					alert(error)
				} else {
					Animations.AnimateModalOut();
				}
			})
		}
	},
	renderQuoteForm(e){
		e.stopPropagation();
		let modal = document.createElement('div');
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
		let authorName = this.props.authorName;
		let deckSlug = this.props.slug;

		Meteor.call('updateLive', authorName, deckSlug, function(error, isLive){
			if (error){
				alert(error);
			}
		});
	},
	actions(){
		let actions = [
			{name: 'Edit', icon: EditIcon, action: this.renderEditModal},
			{name: 'Delete', icon: DeleteIcon, action: this.deleteForm},
			{name: 'Duplicate', icon: DeleteIcon, action: this.duplicateDeck},
		]

		return actions;
	},
	handleClick(e){
		console.log(e);
		let link = "/" + this.props.authorName + '/' + this.props.slug;
		Router.go(link);
	},
	render(){
		let isAuthor = Meteor.userId() == this.props.author;
		let hashtags = this.props.hashtags;

		return (
			<li className="card flex-container">

				{this._cardImage()}

				<div className="card-details flex-1">

					<CardTitle link={"/" + this.props.authorName + '/' + this.props.slug} classes="transition-link">
						{this.props.title}
					</CardTitle>

					{this._cardDescription()}

					{this._hashtags()}

				</div>

				{this._editAction(isAuthor)}

			</li>
		)
	},

	_cardImage(){
		if (this.props.image){

			let backgroundImage = {
				backgroundImage: "url('" + this.props.image + "')"
			};

			return(
				<div className="card-image flex-1" style={backgroundImage}></div>
			)
		}
	},

	_cardDescription(){
		if (this.props.description){
			return(
				<p className="card-description small">{this.props.description}</p>
			)
		}
	},

	_hashtags(){
		if (this.props.hashtags){
			return (
				<div className="deck-hashtags section-item">
					<Hashtags hashtags={this.props.hashtags}/>
				</div>
			)
		}
	},

	_editAction(isAuthor){
		if (isAuthor){
			return(
				<ActionToggle action={this.renderEditModal}/>
			)
		}
	}
});
