window.addEventListener('DOMContentLoaded', () => {
    bindTweet();
});


function bindTweet() {
    const buttons = document.querySelectorAll('.fa-trash');
    const tweetContainer = document.querySelector('#tweet-list-container');
    
    buttons.forEach( button => {
        button.addEventListener('click', ($event) => {
            const tweetId = $event.target.getAttribute('tweetid');
            axios.delete('/tweets/' + tweetId)
                 .then( function(response) {
                     tweetContainer.innerHTML = response.data;
                     bindTweet();
                 })
                 .catch( function(err) { console.log(err) } );
        })
    })
}