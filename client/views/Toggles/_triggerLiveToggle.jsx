TriggerLiveToggle = React.createClass({
	handleClick(){
		var deckId = this.props.deckId;

		if (this.props.live){
			Triggers.EndPresentation(deckId);
		} else {
			Triggers.StartPresentation(deckId);
		}
	},
	render(){
		var live = this.props.live;
		return (
			<div className={"toggle floating-toggle left " + (live ? "negative-btn" : "positive-btn") }>
				<a href={this.props.url} className="transition-link" onClick={this.handleClick}>
					{live ? Icons.StopIcon : Icons.PlayIcon }
				</a>
			</div>
		)
	}
})