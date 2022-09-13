let apiKey = "7fbacaf5493a39dce8d922ade258bf98"
let searchInput = document.querySelector("#searchInput")
let button = document.querySelector("#searchButton")

console.log(searchInput)

function handleFormSubmit(event) {
    event.preventDefault()

    let userInput = searchInput.value.trim()
    console.log(userInput)
    getWeatherdata(userInput)
}
button.addEventListener("click", handleFormSubmit)
function getWeatherdata(userInput) {

    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${userInput}&appid=${apiKey}`)
        .then(function (response) {
            return response.json()

        })
        .then(function (cityData) {

            console.log(cityData[0].lat);
            console.log(cityData[0].lon);
            return { lat: cityData[0].lat, lon: cityData[0].lon }

        })
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
                   // let cardWind1 = document.getElementById("cardWind1")
                 //   cardWind1.textContent="Wind Speed " + weatherArray[1].wind.speed + "mph"
                })
        });


}




   