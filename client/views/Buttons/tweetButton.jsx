TweetButton = React.createClass({

  setTweetURL(){
    let baseURL = "https://twitter.com/intent/tweet?text=";
    let tweet = encodeURIComponent('"' + this.props.tweet + '"');
    let hashtags = "&hashtags=" + this.props.hashtags.join(', ') || '';

    console.log(hashtags);

    return baseURL + tweet + hashtags;
  },

  render(){
    return(
      <a className="btn tweet-btn" href={this.setTweetURL()}>{Icons.TwitterIcon}</a>
    )
  }
})
