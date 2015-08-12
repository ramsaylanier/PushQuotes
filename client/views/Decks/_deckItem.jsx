DeckItem = React.createClass({
	componentDidMount: function(){
		var itemCount = Session.get('itemCount');
		var item = this.getDOMNode();
		Meteor.setTimeout(function(){
			$(item).velocity({
				opacity: 1,
				translateY: [0, 20]
			}, {duration: 1000, easing: [300, 25], delay: (itemCount * 50)});
		}, 0)

		Session.set('itemCount', itemCount + 1);
		// this.hammerTime(item);

	},
	hammerTime: function(item){
		var hammerTime = new Hammer(item);
		hammerTime.on('panleft panright', function(e){
			var dx = e.deltaX;
			var dy = e.deltaY;
			var offset = 0;
			var maxOffset = window.innerWidth;

			//check if x movement is greater than y movement to prevent sliding when scrolling up or down
			if (Math.abs(dx) > Math.abs(dy)){
				offset += (dx / 5);
			}

			console.log(offset);

			//ensure offset can never be greater than number of slides * window width
			if (offset > maxOffset){
				offset = maxOffset;
			}

			$(item).css({
				transform: "translateX(" + offset + "px)"
			});
		})
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
	render: function(){
		var isAuthor = Meteor.userId() == this.props.author;
		var hashtags = this.props.hashtags;

		var backgroundImage = {
			backgroundImage: "url('" + this.props.image + "')"
		};
		
		return (
			<li ref="deckItem" className={(this.props.live ? 'is-live ' : '') + " card flex-container"} >
				{this.props.image && 
					<div className="card-image flex-1" style={backgroundImage}>
						
					</div>
				}

				<div className="card-details flex-1">

					<h1 className="card-title">
						<a 
							href={"/" + this.props.authorName + '/' + this.props.slug} 
							className="transition-link">

							{this.props.title}	

						</a>
					</h1>

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

// CODE FOR VIEWING LIVE PRESENTATION FROM DECK VIEW
// *******
//
// {this.props.live ?
// 	<Section className="deck-section">
// 		<Link color="white" bg="greenBg" size="large" type="button" block={true} href={'/' + this.props.authorName + '/' + this.props.slug + '/live'} className="live-link transition-link">View Presentation</Link>
// 	</Section> :
// 	null 
// }


// <Section className="deck-footer deck-section">
// 	<div className="deck-meta">
// 		<Count count={this.props.quotes.length} name="Quotes" icon={QuoteIcon} />
// 	</div>

// 	<div className="action-list">
// 		{isAuthor && <Actions actions={this.actions()}/>}
// 		{Meteor.userId() && <FavoriteDeck _id={this.props._id}/>}
// 	</div>

// </Section>

Section = React.createClass({
	render: function(){
		return (
			<section className={this.props.className}>
				{this.props.children}
			</section>
		)
	}
});

Actions = React.createClass({
	render: function(){
		var actions = this.props.actions;
		var quoteActions = this.props.isQuote
		return (
			<ul className={(quoteActions ? "quote" : "deck") + "-actions-list"}>
				{actions.map(function(action){
					var icon = action.icon || null;
					return (
						<li key={action.name} className={"deck-action-item " + action.name.toLowerCase().replace(/ +/g, '-') + '-action'}>
							<a href={action.href} className={action.name.toLowerCase().replace(/ +/g, '-') + '-action'} onClick={action.action}>
								{icon ? action.icon : action.name }
							</a>
						</li>
					)
				})}
			</ul>
		)
	}
});



Hashtags = React.createClass({
	render: function(){
		return (
			<div>
				{this.props.hashtags.map(function(hashtag){
					return(
						<Link className="hashtag" href={"/hashtag/" + hashtag}>#{hashtag}</Link>
					)
				})}
			</div>
		)
	}
});