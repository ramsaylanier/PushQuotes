Page = React.createClass(Radium.wrap({
	componentDidMount: function(){
		var item = $(this.getDOMNode());
		AnimateItem(item, this.props.animateIn);
	},
	componentWillUnmount: function(){
		console.log('hi');
		return false;
	},
	render: function(){
		var styles = {
			base: {
				opacity: 0,
				paddingTop: HeaderHeight,
				backgroundImage: "url('" + this.props.backgroundImage + "')",
				backgroundPosition: 'center center',
				backgroundSize: "cover",
			}
		}
		return(
			<div 
				className={"page " + this.props.className}
				style={[
					styles.base
				]}
			>
				{this.props.children}
			</div>
		)
	}
}));

PageHeader = React.createClass(Radium.wrap({
	render: function(){

		var styles = {
			base: {
				position: "relative",
				backgroundPosition: 'center center',
				backgroundSize: "cover",
				minHeight: "70vh",
				backgroundImage: "url('" + this.props.backgroundImage + "')",
				textAlign: "center"
			}
		};

		return (
			<div 
				className="page-header"
				style={[
					styles.base
				]}
			>
				{this.props.children}
			</div>
		)
	}
}));

PageTitle = React.createClass(Radium.wrap({
	componentDidMount: function(){
		var item = this.getDOMNode();
		$(item).velocity({
			opacity: 1,
			scale: [1, .9]
		}, 1000, [.5, .1, .1, 1])
	},
	render: function(){
		var styles = {
			base: {
				padding: "1rem",
				color: "white",
				opacity: 0,
				fontFamily: Fonts.serif,
				fontWeight: 900,
				backgroundColor: Color('black').clearer(.5).hslString(),
				textAlign: 'center',
				display: 'inline-block',
				position: 'relative',
				top: '20vh'
			}
		};

		styles.base[Breakpoints.mobile] = {
			fontSize: '1rem'
		}

		console.log(styles);

		return (
			<h1 className="page-title"
				style={[
					styles.base
				]}
			>
				{this.props.children}
			</h1>
		)
	}
}));