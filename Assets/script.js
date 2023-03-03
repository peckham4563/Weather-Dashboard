const apiKey = 'a0b692553e208684ea0552c053a06561'

var searchButton = document.querySelector('#search-button')
    searchButton.addEventListener('click',function(){
        const cityName = document.querySelector('#search-bar').value;
        const url = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=' + apiKey

fetch(url).then(function(response){
    return response.json()
}).then(function(data){
    const lat = data[0].lat
    const lon = data[0].lon
    searchWeather(lat,lon)
    console.log(data)
})
    })

    const searchWeather = function(lat,lon){
        const weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=imperial'
        fetch(weatherUrl).then(function(response){
            return response.json()
        }).then(function(data){
            var currentTemp = document.querySelector('#current-temp')
            currentTemp.textContent = data.list[0].main.temp.toFixed(0) + "°F";
            var currentCity = document.querySelector('#current-city')
            currentCity.textContent = data.city.name

            const options = {weekday: 'long', month: 'long', day: 'numeric'};
            var currentDate = document.querySelector('#current-date');
            currentDate.textContent = new Date(data.list[0].dt_txt).toLocaleDateString('en-US', options);

            var currentEmoji = document.querySelector('#current-emoji');
            if (currentEmoji) {
                currentEmoji.textContent = getEmoji(data.list[0].weather[0].icon);
            }

            var currentHumidity = document.querySelector('#current-humidity');
            currentHumidity.textContent = data.list[0].main.humidity.toFixed(0) + "%";

            var currentWind = document.querySelector('#current-wind');
            currentWind.textContent = data.list[0].wind.speed.toFixed(1) + " mph";
            
        })
    }

function getEmoji(iconCode) {
    switch (iconCode) {
        case '01d':
        case '01n':
            return '☀️';
        case '02d':
        case '02n':
            return '⛅️';
        case '03d':
        case '03n':
            return '☁️';
        case '04d':
        case '04n':
            return '☁️';
        case '09d':
        case '09n':
            return '🌧';
        case '10d':
        case '10n':
            return '🌦';
        case '11d':
        case '11n':
            return '⛈';
        case '13d':
        case '13n':
            return '❄️';
        case '50d':
        case '50n':
            return '🌫';
        default:
            return '';
    }
}