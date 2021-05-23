var getCityLocation = function (city) {
     var geoUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=d0c4095bfc85fd893ffbd22250d010a9";

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

     citySearchTerm.textContent = searchTerm + " (" + Intl.DateTimeFormat().format(date) + ")";
     citySearchTerm.appendChild(iconEl);

     currentContainerEl.appendChild(ulEl);

     ulEl.appendChild(tempLi);
     ulEl.appendChild(windLi);
     ulEl.appendChild(humidityLi);
     ulEl.appendChild(uvLi);

     console.log(temp);

     // logic for displaying 5 day weather
     var weatherObj = [
          {
               newDate: date.setDate(date.getDate() + 1),
               icon: "http://openweathermap.org/img/wn/" + temp.daily[0].weather[0].icon + "@2x.png",
               temp: temp.daily[0].temp.max,
               wind: temp.daily[0].wind_speed,
               humidity: temp.daily[0].humidity
          },
          {
               newDate: date.setDate(date.getDate() + 2),
               icon: "http://openweathermap.org/img/wn/" + temp.daily[1].weather[0].icon + "@2x.png",
               temp: temp.daily[2].temp.max,
               wind: temp.daily[2].wind_speed,
               humidity: temp.daily[2].humidity
          },
          {
               newDate: date.setDate(date.getDate() + 3),
               icon: "http://openweathermap.org/img/wn/" + temp.daily[2].weather[0].icon + "@2x.png",
               temp: temp.daily[2].temp.max,
               wind: temp.daily[2].wind_speed,
               humidity: temp.daily[2].humidity
          },
          {
               newDate: date.setDate(date.getDate() + 4),
               icon: "http://openweathermap.org/img/wn/" + temp.daily[3].weather[0].icon + "@2x.png",
               temp: temp.daily[3].temp.max,
               wind: temp.daily[3].wind_speed,
               humidity: temp.daily[3].humidity
          },
          {
               newDate: date.setDate(date.getDate() + 5),
               icon: "http://openweathermap.org/img/wn/" + temp.daily[4].weather[0].icon + "@2x.png",
               temp: temp.daily[4].temp.max,
               wind: temp.daily[4].wind_speed,
               humidity: temp.daily[4].humidity
          }
     ];


          $.each(weatherObj[i], function (i, item) {
               // var divWeather = parseInt($("div#weather5day > div").attr("id").split("day-")[1]);

               var divWeather = document.querySelector("#day-1");
               // set date
               var weatherTitle = document.createElement("h4");
               weatherTitle.textContent = Intl.DateTimeFormat().format(weatherObj.newDate)
               // create ul
               var ulEl5 = document.createElement("ul");
     
               // create icon
               var iconSrc = weatherObj.icon;
               var iconImg = document.createElement("img");
               iconImg.setAttribute("src", iconSrc);
     
               // create li items
               var tempLi5 = document.createElement("li");
               tempLi5.textContent = "Temp: " + weatherObj.temp + "°F";
     
               var windLi5 = document.createElement("li");
               windLi5.textContent = "Wind: " + weatherObj.wind + " MPH";
     
               var humidityLi5 = document.createElement("li");
               humidityLi5.textContent = "Humidity: " + weatherObj.humidity + " %";
               
               divWeather.appendChild(weatherTitle);
               divWeather.appendChild(iconImg);
               
               divWeather.appendChild(ulEl5);
     
               ulEl5.appendChild(tempLi5);
               ulEl5.appendChild(windLi5);
               ulEl5.appendChild(humidityLi5);
     
               // document.getElementById("day-1").innerHTML = Intl.DateTimeFormat().format(weatherObj1.newDate);
          });
};
