// Write your package code here!
Page = React.createClass({
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
			backgroundImage: "url('" + this.props.backgroundImage + "')",
		}

		var children = this.props.children;
		return(
			<div className={"page " + this.props.className} style={styles}>
				{ this.props.wrapper ? <div className={"wrapper " + this.props.wrapper}>{children}</div> : children } 
			</div>
		)
	}
});

PageHeader = React.createClass({
	render: function(){

		var styles = {
			backgroundImage: "url('" + this.props.backgroundImage + "')",
		};

		return (
			<div className="page-header" style={styles}>
				{this.props.children}
			</div>
		)
	}
});

PageTitle = React.createClass({
	componentDidMount: function(){
		var item = this.getDOMNode();
		$(item).velocity({
			opacity: 1,
			scale: [1, 1.1]
		}, 1000, [.5, .1, .1, 1])
	},
	render: function(){
		return (
			<h1 className="page-title">
				{this.props.children}
			</h1>
		)
	}
});

PageSection = React.createClass({
	render:function(){
		// var styles = {
		// 	base: {
		// 		padding: "2rem 0rem",
		// 		transformOrigin: "top center",
		// 		backgroundColor: Colors.dark
		// 	}
		// }

		return(
			<section className={"page-section " + this.props.className}>
				<Wrapper>
					{this.props.children}
				</Wrapper>
				{this.props.separator && <PageSeparator/>}
			</section>
		)
	}
});

PageSeparator = React.createClass({
	render: function(){
		return(
			<div className="page-separator">
			</div>
		)
	}
});