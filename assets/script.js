let apiKey = "7fbacaf5493a39dce8d922ade258bf98"
let searchInput = document.querySelector("#searchInput")
let button = document.querySelector("#searchButton")
let storage = JSON.parse(localStorage.getItem("citySearchHistory")) || []


// this block of code is initiating the search for the city and to save the search history to local storage
function handleFormSubmit(event) {
    event.preventDefault()
    let userInput = searchInput.value.trim()
    //console.log(userInput)
    getWeatherdata(userInput)
    storage.push(userInput)
    localStorage.setItem("citySearchHistory",JSON.stringify(storage))
    let listEl = document.createElement("li")
    listEl.textContent = userInput
    listEl.setAttribute("id","searchHistory")//
    let showHistory = document.getElementById("showHistory")
    showHistory.appendChild(listEl)
    let liButton = document.getElementById("searchHistory")//
    liButton.onclick = SearchHistorySearch//
} 


//this code was to be able to click search history(work in progress)
function SearchHistorySearch(){
if (storage.length > 0) {
    getWeatherdata(storage[storage.length - 1]);
}
}

// this two funcitons combine to get both API calls going one for locating the city and the second to get weather info
button.addEventListener("click", handleFormSubmit)
function getWeatherdata(userInput) {
//this api gets Lat and long data
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${userInput}&appid=${apiKey}`)
        .then(function (response) {
            return response.json()

        })
        .then(function (cityData) {

            console.log(cityData[0].lat);
            console.log(cityData[0].lon);
            return { lat: cityData[0].lat, lon: cityData[0].lon }

        })//this api uses the lat and long from the previous one so the user gets search results for a city rather than lat,long
        .then(function (latLonData) {
            return fetch(`https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=${latLonData.lat}&lon=${latLonData.lon}&appid=${apiKey}`)
                .then(function (response) {
                    return response.json()
                })
                .then(function (data) {
                    const weatherInfo = data
                    const weatherArray = []
                    for (let i = 0; i < weatherInfo.list.length; i += 7) {

                        weatherArray.push(weatherInfo.list[i])

                    }
                    //these next blocks are basically all the same (they get the element from html, are
                    //they are assigned information from the API and then is added to the page)
                    //this is done for the current day then repeated for the 5 day forecast    
                    console.log(weatherArray)
                    console.log("weatherInfo", weatherInfo);
                    console.log(weatherArray)
                    let temp = document.getElementById("temp")
                    let feelsLike = document.getElementById("feelsLike")
                    let humidity = document.getElementById("humidity")
                    let windSpeed = document.getElementById("windSpeed")
                    temp.textContent="temp: " + weatherArray[0].main.temp + "F"
                    feelsLike.textContent="feels Like: " + weatherArray[0].main.feels_like + "F"
                    humidity.textContent= "Humidity " + weatherArray[0].main.humidity + "%"
                    windSpeed.textContent="Wind Speed " + weatherArray[0].wind.speed + "mph"
                    let cityDay = document.getElementById("cityDay")
                    cityDay.textContent = weatherInfo.city.name + " (" + weatherArray[0].dt_txt+")"
                    let iconEl =document.getElementById("iconEl");
                    iconEl.src = "https://openweathermap.org/img/w/"+ weatherInfo.list[0].weather[0].icon + ".png";

                    let icon1 =document.getElementById("icon1");
                    icon1.src = "https://openweathermap.org/img/w/"+ weatherInfo.list[7].weather[0].icon + ".png";
                    let date1 = document.getElementById("date1")
                    date1.textContent = weatherArray[1].dt_txt
                    let temp1 = document.getElementById("temp1")
                    temp1.textContent= "temp: " + weatherArray[1].main.temp + "F"
                    let wind1 =document.getElementById("wind1")
                    wind1.textContent = "wind speed:" + weatherArray[1].wind.speed + "mph"
                    let humid1 = document.getElementById("humid1")
                    humid1.textContent= "Humidity" + weatherArray[1].main.humidity + "%"

                    let icon2 =document.getElementById("icon2");
                    icon2.src = "https://openweathermap.org/img/w/"+ weatherInfo.list[15].weather[0].icon + ".png";
                    let date2 = document.getElementById("date2")
                    date2.textContent = weatherArray[2].dt_txt
                    let temp2 = document.getElementById("temp2")
                    temp2.textContent= "temp: " + weatherArray[2].main.temp + "F"
                    let wind2 =document.getElementById("wind2")
                    wind2.textContent = "wind speed:" + weatherArray[2].wind.speed + "mph"
                    let humid2 = document.getElementById("humid2")
                    humid2.textContent= "Humidity" + weatherArray[2].main.humidity + "%"

                    let icon3 =document.getElementById("icon3");
                    icon3.src = "https://openweathermap.org/img/w/"+ weatherInfo.list[23].weather[0].icon + ".png";
                    let date3 = document.getElementById("date3")
                    date3.textContent = weatherArray[3].dt_txt
                    let temp3 = document.getElementById("temp3")
                    temp3.textContent= "temp: " + weatherArray[3].main.temp + "F"
                    let wind3 =document.getElementById("wind3")
                    wind3.textContent = "wind speed:" + weatherArray[3].wind.speed + "mph"
                    let humid3 = document.getElementById("humid3")
                    humid3.textContent= "Humidity" + weatherArray[3].main.humidity + "%"

                    let icon4 =document.getElementById("icon4");
                    icon4.src = "https://openweathermap.org/img/w/"+ weatherInfo.list[30].weather[0].icon + ".png";
                    let date4 = document.getElementById("date4")
                    date4.textContent = weatherArray[4].dt_txt
                    let temp4 = document.getElementById("temp4")
                    temp4.textContent= "temp: " + weatherArray[4].main.temp + "F"
                    let wind4 =document.getElementById("wind4")
                    wind4.textContent = "wind speed:" + weatherArray[4].wind.speed + "mph"
                    let humid4 = document.getElementById("humid4")
                    humid4.textContent= "Humidity" + weatherArray[4].main.humidity + "%"

                    let icon5 =document.getElementById("icon5");
                    icon5.src = "https://openweathermap.org/img/w/"+ weatherInfo.list[39].weather[0].icon + ".png";
                    let date5 = document.getElementById("date5")
                    date5.textContent = weatherArray[5].dt_txt
                    let temp5 = document.getElementById("temp5")
                    temp5.textContent= "temp: " + weatherArray[5].main.temp + "F"
                    let wind5 =document.getElementById("wind5")
                    wind5.textContent = "wind speed:" + weatherArray[5].wind.speed + "mph"
                    let humid5 = document.getElementById("humid5")
                    humid5.textContent= "Humidity" + weatherArray[5].main.humidity + "%"
                })
        });


}


function check(){
userInput=showHistory
getWeatherdata()
}







