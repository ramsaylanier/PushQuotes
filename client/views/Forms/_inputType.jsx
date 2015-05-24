InputType = React.createClass({
	getInitialState: function(){
		var states = {};
		states.value = this.props.value;

		return {value: this.props.value, checked: this.props.checked}
	},
	componentDidMount: function(){
		var control = $(this.getDOMNode());
		var input = control.find('.input-field');
		var label = input.prev('label');

		if (!input.length || !label.length){
			return false;
		} else if (input && input.val().length > 0){
			this.activateField();
		}
	},	
	handleChange: function(e){
		var control = $(this.getDOMNode());
		var input = control.find('.input-field');
		var label = input.prev('label');

		if (this.props.type == 'checkbox'){
			this.setState({checked: e.target.checked})
		} else {
			this.setState({value: e.target.value});
		}
	},
	activateField: function(e){
	 	var control = $(this.getDOMNode());
		var input = control.find('.input-field');
		var label = input.prev('label');

		console.log(control);

		control.addClass('is-focused');

		label.velocity({
			translateY: -input.outerHeight() + label.outerHeight()
		}, 300, [0, .9, .6, 1.1]);
	},
	deactivateField: function(e){
		var control = $(this.getDOMNode());
		var input = control.find('.input-field');
		var label = input.prev('label');

		console.log(control);

		if (input.val().length == 0){
			control.removeClass('is-focused');

			label.velocity({
				translateY: 0
			}, 300, 'easeOutQuant');
		}
	},
	render: function(){
		var hasLabel = this.props.label;
		var isTextArea = this.props.type == 'textArea';
		return (
			<div className={"form-control " + this.props.type + "-control"}>
				<div className="inner">
					{ hasLabel ? <Label {...this.props} /> : null }
					{ isTextArea ?
						<textArea {...this.props} onChange={this.handleChange}>{this.state.value}</textArea> :
						<input {...this.props} value={this.state.value} checked={this.state.checked} onFocus={this.activateField} onBlur={this.deactivateField} onChange={this.handleChange}/>
					}
				</div>
				<span className="input-overlay"></span>
			</div>
		)
	}
});