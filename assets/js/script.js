var getCityLocation = function(city) {
     var geoUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=d0c4095bfc85fd893ffbd22250d010a9";

          // make a request to the geo url
          fetch(geoUrl).then(function(geoResponse) {
               if (geoResponse.ok) {
                    return geoResponse.json();
               } else {
                    alert("Error: City Name Not Found");
               }
          })
          .then(function(geoResponse) {
               // create variables to hold lat and long
               var lat = geoResponse[0].lat;
               var long = geoResponse[0].lon;

               // return fetch request to onecall api for lat and lon
               return fetch(
                    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
                    lat +
                    "&lon=" +
                    long +
                    "&exclude=minutely,hourly,alerts&units=imperial&appid=d0c4095bfc85fd893ffbd22250d010a9"
               );
               
          })
          .then(function(response) {
               response.json().then(function (data) {
               displayTemp(data, city);
               })
          })
  
};


var cityFormEl = document.querySelector("#city-form");
var nameInputEl = document.querySelector("#city");

var currentContainerEl = document.querySelector("#current-container");
var citySearchTerm = document.querySelector("#city-search-term");
var date = new Date();



var formSubmitHandler = function (event) {
     event.preventDefault();
     // get value from input element
     var cityName = nameInputEl.value.trim();

     if (cityName) {
          getCityLocation(cityName);
          nameInputEl.value = "";
     } else {
          alert("Please enter a valid city");
     }
     // console.log(event);
};

cityFormEl.addEventListener("submit", formSubmitHandler);


var displayTemp = function (temp, searchTerm) {


     // show temperature icon
     var icon = "http://openweathermap.org/img/wn/" + temp.current.weather[0].icon + "@2x.png";
     var iconEl = document.createElement("img");
     iconEl.setAttribute("src", icon);
     iconEl.setAttribute("id", "title-icon");

     // create ul container
     var ulEl = document.createElement("ul");
     ulEl.setAttribute("id", "current-temp-params");
     ulEl.setAttribute("class", "list-group")

     // create list for temp, wind, humidity, UV index
     var tempLi = document.createElement("li");
     tempLi.textContent = "Temp: " + temp.current.temp + "°F";

     var windLi = document.createElement("li");
     windLi.textContent = "Humidity: " + temp.current.humidity + " %";

     var humidityLi = document.createElement("li");
     humidityLi.textContent = "Wind: " + temp.current.wind_speed + " MPH";


     // uv index 0-2 green "low", 3-5 yellow "moderate", 6-7 orange "high", 8-10 red "very high"
     var uvLi = document.createElement("li");
     uvLi.textContent = "UV Index: " + temp.current.uvi;


     // clear old content
     currentContainerEl.textContent = "";

     citySearchTerm.textContent = searchTerm + " (" + Intl.DateTimeFormat().format(date) + ")";
     citySearchTerm.appendChild(iconEl);
     
     currentContainerEl.appendChild(ulEl);

     ulEl.appendChild(tempLi);
     ulEl.appendChild(windLi);
     ulEl.appendChild(humidityLi);
     ulEl.appendChild(uvLi);

     console.log(temp);


};