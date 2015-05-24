Modal = React.createClass({
	componentDidMount: function(){
		$('.modal').velocity({
			opacity: 1
		}, 400, 'easeOut')
	},
	closeModal: function(){
		var modal = $('.modal');

		modal.velocity({
			opacity: 0
		}, 400, 'easeOut');

		Meteor.setTimeout(function(){
			React.unmountComponentAtNode(modal.get(0));
			modal.remove();
		}, 400);
	},
	render: function(){
		return (
			<div className="modal-content">
				<Toggle className="close-modal-btn btn" onClick={this.closeModal}/>
				{this.props.children}
			</div>
		)
	}
})