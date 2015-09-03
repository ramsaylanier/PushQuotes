Modal = React.createClass({
	scrollTop: 0,
	getWindowScrollTop: function(){
		this.scrollTop = $(window).scrollTop();	
		return this.scrollTop
	},
	componentWillMount: function(){
		$('body').css({
			top: -this.getWindowScrollTop()
		});
	},
	componentDidMount: function(){
		AnimateModalIn();
	},
	closeModal: function(){
		AnimateModalOut();
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