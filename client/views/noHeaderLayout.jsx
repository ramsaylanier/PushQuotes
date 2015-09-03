NoHeaderLayout = React.createClass({
	render(){
		console.log('no header layout render');
		return (
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"></meta>
				<meta name="fragment" content="!"></meta>

				<title>Push Quotes</title>
				
				<div className="application">
					<main>
						{this.props.content}
					</main>
				</div>
			</head>
		)
	}
});