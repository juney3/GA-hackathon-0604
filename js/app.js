console.log('sanity check');

// Google custom API search data
const cse = '';
const key = '';


// jQuery ready
$(document).ready(function() {

  // Global vars
  let custom = "https://www.googleapis.com/customsearch/v1?parameters"
  let userInterests = [];

  function handleError(error) {
    console.log(`error: ${error}`);
  }

  console.log('ready to go');


  $('form').on('submit', event => {
    event.preventDefault();

    let searchQuery =
    `https://www.googleapis.com/customsearch/v1?key=${key}&cx=${cse}&q=${userInterests}&num=10&safe=medium&dateRestrict=m2&alt=json`

    $('input:checked').each(function(){
      let userInterest = $(this).val();
      console.log(userInterest);
      let interest = {'topic': userInterest};
      userInterests.push(interest);
      console.log(userInterests);
    })

    console.log(userInterests);

    userInterests.forEach(function(interest) {
      let topic = interest.topic;

      let searchQuery =
      `https://www.googleapis.com/customsearch/v1?key=${key}&cx=${cse}&q=${topic}&num=10&safe=medium&dateRestrict=m2&alt=json`

      console.log(searchQuery);

        $.ajax({
          type: 'GET',
          url: searchQuery,
          success: function(news){
            console.log(news);
            interest.results = news;
            console.log(userInterests);
            console.log(interest.results.items[0].title);

            let itemsArray = interest.results.items;
            console.log(itemsArray);


            for (var i = 0; i < itemsArray.length; i++) {
              $('.results').append(`<h2>Topic: ${interest.topic}</h2><a href="${itemsArray[i].link}" target="new"><p>${itemsArray[i].title}: ${itemsArray[i].snippet}</p></a>`);
            }
            interest.results.items.forEach(function(headline){
              $('.results').append(interest.results.items.title);
            })
          },
          error: handleError,
          dataType: 'json'
        })
    })
  })
})
