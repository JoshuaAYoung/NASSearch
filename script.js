'use strict';

// put your own value below!
const apiKey = 'BxqyoJOceonMXEuLuLfO55oMByucJZKX24d9FeBg'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';

//make the params string with all of the parameters to add to the baseurl
function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  $('.results').empty();
  // iterate through the items array
  console.log(responseJson.data[0].fullName);
  console.log(responseJson.data.length);
  for (let i = 0; i < responseJson.data.length; i++){
    // for each video object in the items 
    //array, add a list item to the results 
    //list with the video title, description,
    //and thumbnail
    $('.results').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>Description: ${responseJson.data[i].description}</p>
      <p>URL: ${responseJson.data[i].url}</p>
      </li>`
    )};
};

function getParks(state, limitNumber) {
  const params = {
    stateCode: state,
    limit: limitNumber,
    api_key: apiKey
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('.error').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
    $('.form').on('submit', function(event){
    event.preventDefault();
    const state = $('input[name="stateCode"]').val();
    const limit = $('input[name="maxResults"]').val();
    getParks(state, limit);
  });
}

$(watchForm);

















// https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=BxqyoJOceonMXEuLuLfO55oMByucJZKX24d9FeBg

// 'use strict';

// const npsUrl = "https://developer.nps.gov/api/v1/parks?";
// const apiKey = "BxqyoJOceonMXEuLuLfO55oMByucJZKX24d9FeBg"
// let githubUser = "wrong";
// let url = "";

// function displayResults (responseJson) {
//     $(".results").empty();
//     for (let i = 0; i < responseJson.length; i++) {
//         $(".results").append(
//            `<h2>Repo ${i+1}:</h2>
//            <p>Name: ${responseJson[i].name}</p>
//            <p><a href=${responseJson[i].html_url} alt="${responseJson[i].name} repo link">${i+1} Link</a></p>`
//         )
//     }
// }

// function getRepos() {
//     fetch(url)
//     .then(response => response.json())
//     .then(responseJson => displayResults(responseJson));
// }

// function getUser() {
//     $('.form').on('submit', function(event){
//         event.preventDefault();
//         githubUser = $(this).find('input[name="handle"]').val();
//         url = githubUrl + githubUser + repoText;
//         getRepos();
// })
// }

// $(function(){
//     getUser();
// })