var getCityWeather = function (city) {
     // awaiting key to be activated
     var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + "d0c4095bfc85fd893ffbd22250d010a9";

     // make a request to the url
     fetch(apiUrl).then(function (response) {
          if (response.ok) {
               response.json().then(function (data) {
                    displayTemp(data, city);
               });
          } else {
               alert("Error: City Name Not Found");
          }
     })
     .catch(function(error) {
          alert("Unable to connect to Weather Information");
     });
};

var cityFormEl = document.querySelector("#city-form");
var nameInputEl = document.querySelector("#city");

var currentContainerEl = document.querySelector("#current-container");
var citySearchTerm = document.querySelector("#city-search-term");
var date = new Date();



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




var displayTemp = function (temp, searchTerm) {
     console.log(temp);
     console.log(searchTerm);
     var icon = "http://openweathermap.org/img/wn/" + temp.weather[0].icon + "@2x.png";
     var iconEl = document.createElement("img");
     iconEl.setAttribute("src", icon);
     iconEl.setAttribute("id", "title-icon");
     // clear old content
     currentContainerEl.textContent = "";

     citySearchTerm.textContent = searchTerm + " (" + Intl.DateTimeFormat().format(date) + ")";
     citySearchTerm.appendChild(iconEl);



};