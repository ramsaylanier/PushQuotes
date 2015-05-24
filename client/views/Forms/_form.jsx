Form = React.createClass({
	submit: function(e){
		this.props.onSubmit(e);
	},
	render: function(){
		var fields = this.props.attributes.fields;
		return(
			<form {...this.props.attributes}>
				{fields.map(function(field){
					return <InputType key={field.id} {...field}/>
				})}
			</form>
		)
	}
});