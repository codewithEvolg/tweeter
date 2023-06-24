/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(()=>{
  

  // Test / driver code (temporary). Eventually will get this from the server.
  const tweetData = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]


  //create html element for each tweet dynamically
  const createTweetElement = (tweetObj) => {
    const tweet_Time = timeago.format(tweetObj.created_at)
    const tweet = $(`<article class="tweet-article">
            <header>
              <div>
                <h3><img src=${tweetObj.user.avatars} alt="profile pic"/>${tweetObj.user.name}</h3>
                <h2>${tweetObj.user.handle}</h2>  
              </div>
              <p class="tweet">${tweetObj.content.text}</p>
            </header>
            <hr>

            <footer>
            <span>${tweet_Time}</span> 
            
              <div>
                <span><i class="fa-solid fa-flag"></i></span>
                <span><i class="fa-solid fa-retweet"></i></span>
                <span><i class="fa-solid fa-heart"></i></span>
              </div>
            </footer>
          </article>`);
      return tweet;
  }

  const renderTweets = function(tweets) {
    let tweetResult = [];
    // loops through tweets
    for (const tweet in tweets) {
      tweetResult.push(createTweetElement(tweets[tweet])); // calls createTweetElement for each tweet
    }
    return tweetResult;
  }
  
  $('#tweet-form').on('submit', function(event) {
    event.preventDefault();
    const formData = $('#tweet-form').serialize();
    const tweet = $('#tweet-text').val();
    // Check if formData is empty or null
    if (tweet === '' || tweet.length > 140) {
      alert('Invalid tweet!');
      return; // Exit the function
    }
    $.post('/tweets', formData)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  })

  const $loadTweets = () => {
    $.get('/tweets')
      .then(res => {
        $('#tweets-container').prepend(renderTweets(res)) //takes return value and appends it to the tweets container
      })
      .catch(err => {
        console.log(err)
      })
  }

  $loadTweets();

  // $('span.timeago').each(function() {
  //   var timestamp = $(this).data('time');
  //   $(this).text(timeago.format(timestamp));
  // });
});




