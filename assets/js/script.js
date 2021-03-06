var getCityLocation = function (city) {

     var geoUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=d0c4095bfc85fd893ffbd22250d010a9";

     // make a request to the geo url
     fetch(geoUrl).then(function (geoResponse) {
          if (geoResponse.ok) {
               return geoResponse.json();
          } else {
               alert("Error: City Name Not Found");
          }
     })
          .then(function (geoResponse) {
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
          .then(function (response) {
               response.json().then(function (data) {
                    displayTemp(data, city);
                    fiveDayWeather(data, city);
               })
          })

};


var cityFormEl = document.querySelector("#city-form");
var nameInputEl = document.querySelector("#city");

var currentContainerEl = document.querySelector("#current-container");
var citySearchTerm = document.querySelector("#city-search-term");



var citylist = document.querySelector("#city-list");

var searchedCities = [];


var formSubmitHandler = function (event) {
     event.preventDefault();
     // get value from input element
     var cityName = nameInputEl.value.trim();

     if (cityName) {
          getCityLocation(cityName);
          nameInputEl.value = "";
          citylist.innerHTML += '<li class="list-group-item city-searched">' + cityName + '</li>';
          searchedCities.push(cityName);


     } else {
          alert("Please enter a valid city");
     }

     // save search city into list and make item clickable for faster input name back getCityLocation

     $('.city-searched').on('click', function () {
          console.log("city name clicked");
          // submit name back into getCityLocation
          var cityClicked = $(this).text();
          console.log(cityClicked);
          getCityLocation(cityClicked);

     });

     localStorage.setItem("citylist", JSON.stringify(searchedCities));
     console.log(searchedCities);

};


cityFormEl.addEventListener("submit", formSubmitHandler);

// display today's forecase in main container
var displayTemp = function (temp, searchTerm) {

     // show temperature icon
     var icon = "https://openweathermap.org/img/wn/" + temp.current.weather[0].icon + "@2x.png";
     var iconEl = document.createElement("img");
     iconEl.setAttribute("src", icon);
     iconEl.setAttribute("id", "title-icon");

     // create ul container
     var ulEl = document.createElement("ul");
     ulEl.setAttribute("id", "current-temp-params");
     ulEl.setAttribute("class", "list-group")

     // create list for temp, wind, humidity, UV index
     var tempLi = document.createElement("li");
     tempLi.textContent = "Temp: " + temp.current.temp + "??F";


     var windLi = document.createElement("li");
     windLi.textContent = "Wind: " + temp.current.wind_speed + " MPH";

     var humidityLi = document.createElement("li");
     humidityLi.textContent = "Humidity: " + temp.current.humidity + " %";

     // uv index 0-2 green "low", 3-5 yellow "moderate", 6-7 orange "high", 8-10 red "very high"
     var uvLi = document.createElement("li");

     // if condition to set which class applies to span for badge

     if (temp.current.uvi < 2.9) {
          uvLi.innerHTML = 'UV Index: <span class="btn btn-sm green">' + temp.current.uvi + '</span>';
     } else if (temp.current.uvi > 3 && temp.current.uvi < 5.9) {
          uvLi.innerHTML = 'UV Index: <span class="btn btn-sm yellow">' + temp.current.uvi + '</span>';
     } else if (temp.current.uvi > 6 && temp.current.uvi < 7.9) {
          uvLi.innerHTML = 'UV Index: <span class="btn btn-sm orange">' + temp.current.uvi + '</span>';
     } else {
          uvLi.innerHTML = 'UV Index: <span class="btn btn-sm red">' + temp.current.uvi + '</span>';
     }

     // clear old content
     currentContainerEl.textContent = "";
     var date = new Date();
     citySearchTerm.textContent = searchTerm + " (" + Intl.DateTimeFormat().format(date) + ")";
     console.log(date);
     citySearchTerm.appendChild(iconEl);

     currentContainerEl.appendChild(ulEl);

     ulEl.appendChild(tempLi);
     ulEl.appendChild(windLi);
     ulEl.appendChild(humidityLi);
     ulEl.appendChild(uvLi);

     console.log(temp);

};

var fiveDayWeather = function (futuretemp, searchTerm) {

     var date = new Date();
     // logic for displaying 5 day weather
     var weatherObj = [
          {
               newDate: date.setDate(date.getDate() + 1),
               icon: "https://openweathermap.org/img/wn/" + futuretemp.daily[0].weather[0].icon + "@2x.png",
               temp: futuretemp.daily[0].temp.max,
               wind: futuretemp.daily[0].wind_speed,
               humidity: futuretemp.daily[0].humidity
          },
          {
               newDate: date.setDate(date.getDate() + 1),
               icon: "https://openweathermap.org/img/wn/" + futuretemp.daily[1].weather[0].icon + "@2x.png",
               temp: futuretemp.daily[2].temp.max,
               wind: futuretemp.daily[2].wind_speed,
               humidity: futuretemp.daily[2].humidity
          },
          {
               newDate: date.setDate(date.getDate() + 1),
               icon: "https://openweathermap.org/img/wn/" + futuretemp.daily[2].weather[0].icon + "@2x.png",
               temp: futuretemp.daily[2].temp.max,
               wind: futuretemp.daily[2].wind_speed,
               humidity: futuretemp.daily[2].humidity
          },
          {
               newDate: date.setDate(date.getDate() + 1),
               icon: "https://openweathermap.org/img/wn/" + futuretemp.daily[3].weather[0].icon + "@2x.png",
               temp: futuretemp.daily[3].temp.max,
               wind: futuretemp.daily[3].wind_speed,
               humidity: futuretemp.daily[3].humidity
          },
          {
               newDate: date.setDate(date.getDate() + 1),
               icon: "https://openweathermap.org/img/wn/" + futuretemp.daily[4].weather[0].icon + "@2x.png",
               temp: futuretemp.daily[4].temp.max,
               wind: futuretemp.daily[4].wind_speed,
               humidity: futuretemp.daily[4].humidity
          }
     ];


     $.each(weatherObj, function (i, item) {

          var divWeather = document.querySelector(`#day-${i + 1}`);
          $(divWeather).addClass("future-weather-padding");
          // set date
          var weatherTitle = document.createElement("h5");
          weatherTitle.textContent = Intl.DateTimeFormat().format(item.newDate)
          // create ul
          var ulEl5 = document.createElement("ul");
          ulEl5.setAttribute("class", "future-weather-ul");

          // create icon
          var iconSrc = item.icon;
          var iconImg = document.createElement("img");
          iconImg.setAttribute("src", iconSrc);
          iconImg.setAttribute("class", "weather-icons");

          // create li items
          var tempLi5 = document.createElement("li");
          tempLi5.textContent = "Temp: " + item.temp + "??F";

          var windLi5 = document.createElement("li");
          windLi5.textContent = "Wind: " + item.wind + " MPH";

          var humidityLi5 = document.createElement("li");
          humidityLi5.textContent = "Humidity: " + item.humidity + " %";

          // clear old content
          divWeather.innerHTML = "";
         

          divWeather.appendChild(weatherTitle);
          divWeather.appendChild(iconImg);

          divWeather.appendChild(ulEl5);

          ulEl5.appendChild(tempLi5);
          ulEl5.appendChild(windLi5);
          ulEl5.appendChild(humidityLi5);
     })
};

var cityRecall = function () {

     var citySearch = JSON.parse(localStorage.getItem("citylist"));

     if (!citySearch) {
          console.log("empty list");
          searchedCities = [];
          return false;
     } else {
          for (var i = 0; i < citySearch.length; i++) {
               citylist.innerHTML += '<li class="list-group-item city-searched">' + citySearch[i] + '</li>';
          }
          console.log("added " + citySearch + " to list");
     }

     $('.city-searched').on('click', function () {
          console.log("city name clicked");
          // submit name back into getCityLocation
          var cityClicked = $(this).text();
          console.log(cityClicked);
          getCityLocation(cityClicked);

     });

};

window.onload = cityRecall();
