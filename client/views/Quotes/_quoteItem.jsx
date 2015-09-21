QuoteItem = React.createClass({
	getInitialState(){
		return{
			mc: null,
			snapped: false,
			isAuthor: false
		}
	},
	componentDidMount(){
		var item = this.getDOMNode(this.refs.quoteListItem);
		var itemCount = Session.get('quoteCount');
		var isAuthor = Meteor.userId() === this.props.deck.author;

		this.setState({isAuthor: Meteor.userId() === this.props.deck.author});

		Session.set('quoteCount', itemCount + 1);
		Animations.AnimateCardIn(item, itemCount);

		this.setState({mc: new Hammer(item)});
	},
	componentDidUpdate(oldProps){
		if (this.state.isAuthor){
			var item = this.getDOMNode(this.refs.quoteListItem);
			this.setPan(item);
		}

		if (oldProps.deck.live && !this.props.deck.live){
			Animations.ResetCards();
		}
	},
	componentWillUnmount(){
		var item = this.getDOMNode(this.refs.quoteListItem);
		Animations.AnimateCardOut(item);
	},
	setPan(item){
		var mc = this.state.mc;
		var snapped = this.state.snapped;
		var self = this;

		if (this.props.deck.live && mc){
			mc.set({enable: true});
			mc.on("panleft", function(ev) {
				if (-ev.deltaX > window.innerWidth / 3 && !self.state.snapped){
					self.Snap(item);
				}

				if (!self.state.snapped){
					TweenMax.to(item, 1, {
						x: ev.deltaX,
						rotation: ev.deltaX / 180,
						scale: 1 - ev.deltaX/window.innerWidth/2,
						boxShadow: "0px " + (-ev.deltaX/10 + 5) + "px " + (-ev.deltaX/10 + 5) + "px -5px rgba(0,0,0,.3)"
					});
				}
			});

			mc.on("panend", function(ev){
				if (!self.state.snapped){
					TweenMax.to(item, .3, {
						x: 0,
						rotation: 0,
						scale: 1,
						boxShadow: "0px 5px 5px -5px rgba(0,0,0,.3)"
					});
				}
			});
		} else if (mc) {
			mc.set({enable: false});
		}
	},
	Snap(item){
		var self = this;
		self.state.snapped = true;

		TweenMax.to(item, .3, {
			x: -window.innerWidth,
			rotation: -10,
			scale: 1
		});

		Meteor.setTimeout(function(){
			Meteor.call('pushQuote', self.props._id, function(err, res){
				if (err){
					Alerts.throw(err, 'error');
				}
			})
			self.state.snapped = false;
		}, 300);
	},
	renderEditModal(){
		editQuoteForm.data = this.props;
		editQuoteForm.fields[0].value = this.props.text;
		editQuoteForm.fields[1].value = this.props.slide;
		editQuoteForm.fields[2].value = this.props.order || Quotes.find().count();
		editQuoteForm.fields[1].visibility = this.props.withSlides ? 'visible' : 'hidden';

		Triggers.EditQuote(this.props);
	},
	deleteQuote(){
		var confirmDelete = confirm('Do you want to delete this quote?');

		if (confirmDelete){
			var quoteID = this.props._id;
			var deckID = this.props.deckId;

			Meteor.call('deleteQuote', quoteID, deckID, function(error){
				if (error){
					alert(error)
				} else {
					Animations.AnimateModalOut();
				}
			})
		}
	},
	actions(){
		var actions = [
			{name: 'Edit', icon: EditIcon, action: this.renderEditModal},
			{name: 'Delete', icon: DeleteIcon, action: this.deleteForm}
		]

		return actions;
	},
	getTweets(quoteId){
		return Quotes.findOne(quoteId).tweets || 0
	},
	render(){
		var deck = this.props.deck;
		var isAuthor = Meteor.userId() === deck.author;
		var isLive = deck.live;
		var hasPlayed = this.props.hasPlayed
		var isPrivate = this.props.isPrivate;
		var quoteId = this.props._id;
		var draggable = isAuthor && isLive;


		return (
			<li ref="quoteListItem" className="quote-item item">
				<div className="quote-header">
					{isAuthor && this.props.order && <p className="quote-slide small">Order: {this.props.order}</p>}
					{isAuthor && this.props.slide && <p className="quote-slide small">Slide: {this.props.slide}</p>}
				</div>
				<div className="quote-body">
					<p className="quote-text">{'"' + this.props.text + 	'"'}</p>
				</div>
				<div className="quote-footer">
					<div className="action-list">
						{isPrivate && !isLive && <span className="is-private">private</span>}
						{isAuthor && !isLive && <ActionToggle action={this.renderEditModal}/>}
						{hasPlayed && <QuoteActions quote={this.props.text} hashtags={deck.hashtags} quoteId={this.props._id} />}
					</div>
				</div>
			</li>
		)
	}
});