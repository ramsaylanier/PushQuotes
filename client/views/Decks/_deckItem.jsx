DeckItem = React.createClass(Radium.wrap({
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
	},
	renderEditModal: function(){
		var modal = document.createElement('div');
		$(modal).addClass('modal edit-deck-modal');
		document.body.appendChild(modal);

		editDeckForm.fields[0].value = this.props.title;
		editDeckForm.fields[1].value = this.props.slug;
		editDeckForm.fields[2].value = this.props.description;
		editDeckForm.fields[3].value = this.props.hashtags;
		editDeckForm.fields[4].checked = this.props.withSlides;
		editDeckForm.fields[5].checked = this.props.isPrivate;
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
		
		var styles = {
			base: {
				opacity: "0",
				backgroundColor: "white"
			},
			live: {

				backgroundColor: Color(Colors.green).lighten(.99).hexString(),
				border: "solid " + Color(Colors.green).darken(0.2).hexString() + " 0.25rem"
			},

			title: {
				base: {
					transition: "all 300ms ease-out"
				},
				live:{
					color: Color(Colors.green).darken(.2).hexString()
				}
			}
		}
		console.log("PROPS")
		console.log(this.props)
		return (
			<li 
				style={[
					styles.base,
					this.props.live && styles.live
				]}

				className={(this.props.live ? 'is-live ' : '') + "deck-item item"} >

				<Section className="deck-header deck-section">
					<h1 className="deck-title">
						<a 
							style={[
								styles.title.base,
								Grid.two,
								this.props.live && styles.title.live
							]}
							href={"/" + this.props.authorName + '/' + this.props.slug} 
							className="transition-link">

							{this.props.title}	

						</a>
						{isPrivate ? <span className="is-private">private</span> : null}

					</h1>
					{this.props.showAuthor && <Headings.p className="deck-author">
						<a 
							style={[
								styles.title.base,
								Grid.two,
								this.props.live && styles.title.live
							]}
							href={"/" + this.props.authorName} 
							className="transition-link">

							By {this.props.authorName}

						</a>
					</Headings.p>}
					<p className="deck-description">{this.props.description}</p>
				</Section>

				{this.props.live ?
					<Section className="deck-section">
						<Link color="white" bg="greenBg" size="large" type="button" block={true} href={'/' + this.props.authorName + '/' + this.props.slug + '/live'} className="live-link transition-link">View Presentation</Link>
					</Section> :
					null 
				}

				<Section className="deck-details deck-section">
					<div className="deck-hashtags section-item">
						<Hashtags hashtags={this.props.hashtags}/>
					</div>
				</Section>


				<Section className="deck-footer deck-section">
					<div className="deck-meta">
						<Count count={this.props.quotes.length} name="Quotes" icon={QuoteIcon} />
					</div>

					<div className="action-list">
						{isAuthor ? <DeckActions actions={this.actions()}/>: null}
					</div>
				</Section>
			</li>
		)
	}
}));

Section = React.createClass(Radium.wrap({
	render: function(){
		return (
			<section className={this.props.className}>
				{this.props.children}
			</section>
		)
	}
}));

DeckActions = React.createClass(Radium.wrap({
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
}));



Hashtags = React.createClass(Radium.wrap({
	render: function(){
		return (
			<div>
				{this.props.hashtags.map(function(hashtag){
					return(
						<span className="hashtag">#{hashtag}</span>
					)
				})}
			</div>
		)
	}
}));