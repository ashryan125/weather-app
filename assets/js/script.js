var getCityWeather = function (city) {
     // awaiting key to be activated
     var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=/" + city + "&appid=" + "d0c4095bfc85fd893ffbd22250d010a9";

     // make a request to the url
     fetch(apiUrl).then(function (response) {
          response.json().then(function (data) {
               console.log(data);
          });
     });
};

var cityFormEl = document.querySelector("#city-form");
var nameInputEl = document.querySelector("#city");

var formSubmitHandler = function (event) {
     event.preventDefault();
     // get value from input element
     var cityname = nameInputEl.value.trim();

     if (cityname) {
          getCityWeather(cityname);
          nameInputEl.value = "";
     } else {
          alert("Please enter a valid city");
     }
     console.log(event);
};

cityFormEl.addEventListener("submit", formSubmitHandler);