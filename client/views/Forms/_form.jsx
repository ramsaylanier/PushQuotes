// Form = React.createClass(Radium.wrap({
// 	componentDidMount: function(){
// 		if (this.props.attributes.animateIn){
// 			var item = this.getDOMNode();

// 			$(item).velocity({
// 				opacity: [1,0],
// 				translateY: [0, centerY]
// 			}, 1000, [300, 20])
// 		}
// 	},
// 	submit: function(e){
// 		this.props.onSubmit(e);
// 	},
// 	render: function(){
// 		var fields = this.props.attributes.fields;

// 		var styles = {
// 			base: {

// 			},
// 			login: {
				
// 			}
// 		}
		
// 		return(
// 			<form {...this.props.attributes}
// 				style={[
// 					styles.base,
// 					this.props.attributes.type == 'login' && styles.login,
// 					this.props.attributes.centered && styles.centered
// 				]}
// 			>
// 				{fields.map(function(field){
// 					return <InputType key={field.id} {...field}/>
// 				})}
// 			</form>
// 		)
// 	}
// }));