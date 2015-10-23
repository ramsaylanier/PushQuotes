QuoteItem = React.createClass({

	propTypes: {
		isAuthor: React.PropTypes.bool.isRequired,
		withSlides: React.PropTypes.bool.isRequired,
		deck: React.PropTypes.object.isRequired
	},

	getInitialState(){
		return{
			mc: null,
			snapped: false,
			isAuthor: false
		}
	},

	componentDidMount(){
		let item = this.getDOMNode(this.refs.quoteListItem);
		let itemCount = Session.get('quoteCount');
		let isAuthor = Meteor.userId() === this.props.deck.author;

		this.setState({isAuthor: Meteor.userId() === this.props.deck.author});

		Session.set('quoteCount', itemCount + 1);
		Animations.AnimateCardIn(item, itemCount);

		this.setState({mc: new Hammer(item)});
	},

	componentDidUpdate(oldProps){
		if (this.state.isAuthor){
			let item = this.getDOMNode(this.refs.quoteListItem);
			this.setPan(item);
		}

		if (oldProps.deck.live && !this.props.deck.live){
			Animations.ResetCards();
		}
	},

	componentWillUnmount(){
		let item = this.getDOMNode(this.refs.quoteListItem);
		Animations.AnimateCardOut(item);
	},

	render(){
		let deck = this.props.deck;
		let isLive = deck.live;
		let draggable = this.props.isAuthor && isLive;

		return (
			<li ref="quoteListItem" className="quote-item item">
				<div className="quote-header">
					{this._quoteOrder()}
					{this._quoteSlide()}
				</div>
				<div className="quote-body">
					<p className="quote-text">{'"' + this.props.text + 	'"'}</p>
					{this._quoteActions()}
				</div>
				<div className="quote-footer">
					{this._actionToggle()}
				</div>
			</li>
		)
	},

	_quoteOrder(){
		if (this.props.isAuthor && this.props.order){
			return <p className="quote-slide small">Order: {this.props.order}</p>
		}
	},

	_quoteSlide(){
		if (this.props.isAuthor && this.props.slide){
			return(
				<p className="quote-slide small">Slide: {this.props.slide}</p>
			)
		}
	},

	_quoteActions(){
		if (!this.props.isAuthor && this.props.deck.live){
			return(
				<TweetButton tweet={this.props.text} hashtags={this.props.deck.hashtags}/>
			)
		}
	},

	_actionToggle(){
		if (this.props.isAuthor && !this.props.isLive){
			return (
				<div className="action-list">
					<ActionToggle action={this.renderEditModal}/>
				</div>
			)
		}
	},

	setPan(item){
		let mc = this.state.mc;
		let snapped = this.state.snapped;

		if (this.props.deck.live && mc){
			mc.set({enable: true});
			mc.on("panleft", (ev) => {
				if (-ev.deltaX > window.innerWidth / 3 && !this.state.snapped){
					this.Snap(item);
				}

				if (!this.state.snapped){
					TweenMax.to(item, 1, {
						x: ev.deltaX,
						rotation: ev.deltaX / 180,
						scale: 1 - ev.deltaX/window.innerWidth/2,
						boxShadow: "0px " + (-ev.deltaX/10 + 5) + "px " + (-ev.deltaX/10 + 5) + "px -5px rgba(0,0,0,.3)"
					});
				}
			});

			mc.on("panend", (ev) => {
				if (!this.state.snapped){
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
		let quoteId = this.props._id;
		this.state.snapped = true;

		TweenMax.to(item, .3, {
			x: -window.innerWidth,
			rotation: -10,
			scale: 1
		});

		Meteor.setTimeout( ()=> {
			Meteor.call('pushQuote', quoteId, function(err, res){
				if (err){
					Alerts.throw(err, 'error');
				}
			})

			this.state.snapped = false;
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
		let confirmDelete = confirm('Do you want to delete this quote?');

		if (confirmDelete){
			let quoteID = this.props._id;
			let deckID = this.props.deckId;

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
		let actions = [
			{name: 'Edit', icon: EditIcon, action: this.renderEditModal},
			{name: 'Delete', icon: DeleteIcon, action: this.deleteForm}
		]

		return actions;
	}
});
