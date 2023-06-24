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

  const createTweetElement = (tweetObj) => {
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
              <p>${tweetObj.created_at}</p>
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
      tweetResult.push(createTweetElement(tweets[tweet]));
    }
    return tweetResult;
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  }

  const $tweet = renderTweets(tweetData);

  // // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

  $('#tweet-form').on('submit', function(event) {
    event.preventDefault();
    const formData = $('#tweet-form').serialize();
    $.post('/tweets', formData)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  })
});




