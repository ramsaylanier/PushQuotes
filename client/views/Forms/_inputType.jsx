InputType = React.createClass(Radium.wrap({
	getInitialState: function(){
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

		this.setState({isFocused:true});

		label.velocity({
			translateY: -input.outerHeight() + label.outerHeight()
		}, 300, [0, .9, .6, 1.1]);
	},
	deactivateField: function(e){
		var control = $(this.getDOMNode());
		var input = control.find('.input-field');
		var label = input.prev('label');

		if (input.val().length == 0){
			this.setState({isFocused:false});

			label.velocity({
				translateY: 0
			}, 300, 'easeOutQuant');
		}
	},
	render: function(){
		var hasLabel = this.props.label;
		var isTextArea = this.props.type == 'textArea';

		var styles= {
			formControl: {
				position: "relative",
				marginBottom: "1.75rem"
			},
			input: {
				base: {
					position: "relative",
					border: 0,
					fontSize: "1rem",
					padding: ".5rem",
					borderRadius: 2,
					backgroundColor: Color("#fff").darken(.1).clearer(.5).hexString(),
					color: "black",
					transition: "all 300ms ease-out",
					":focus":{
						outline: "none",
						backgroundColor: "transparent",
						color: "white"
					}
				},
				textArea: {
					transition: "background-color 300ms ease-out"
				},
				submit: {
					backgroundColor: Colors.primary,
					color: "black",
					transition: "all 150ms ease-out",
					cursor: "pointer",
					borderRadius: 3,
					webkitAppearance: "none",
					":hover": {
						backgroundColor: Colors.green
					}
				}
			},
			overlay: {
				position: "absolute",
				width: "100%",
				height: 2,
				backgroundColor: "black",
				bottom: 0,
				left: 0,
				borderRadius: 2,
				transition: "height 300ms ease-out"
			},
			focused:{
				overlay: {
					height: "100%",
					zIndex: -1
				},
				input:{
					backgroundColor: "transparent",
					color: "white"
				}
			}
		}

		return (
			<div 
				className={"form-control " + this.props.visibility + " " + this.props.type + "-control"}
				style={[
					styles.formControl
				]}
			>
				<FlexContainer className="inner">
					{ hasLabel ? <Label {...this.props} /> : null }
					{ isTextArea ?
						<textArea 
							{...this.props} 
							onChange={this.handleChange}
							style= {[
								styles.input.base,
								styles.input.textArea
							]}
						>
							{this.state.value}
						</textArea> :
						<input 
							{...this.props}
							value={this.state.value}
							checked={this.state.checked}
							onFocus={this.activateField}
							onBlur={this.deactivateField}
							onChange={this.handleChange}
							style= {[
								styles.input.base,
								this.props.type == 'submit' && styles.input.submit,
								this.state.isFocused && styles.focused.input
							]}/>
					}
				</FlexContainer>
				<span 
					className="input-overlay"
					style={[
						styles.overlay,
						this.state.isFocused && styles.focused.overlay
					]}
				>
				</span>
			</div>
		)
	}
}));