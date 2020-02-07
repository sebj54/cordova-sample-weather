var weather = {
    APIUrl: 'https://api.openweathermap.org/data/2.5/forecast?APPID=c612b85f3be89e4849cb46bb755f8eb8&units=metric&lang=fr',
    forecast: null,
    iterator: 0,
    emojiIcons: {
        '01d': '☀',
        '01n': '🌕',
        '02d': '🌥',
        '02n': '🌥',
        '03d': '☁',
        '03n': '☁',
        '04d': '☁',
        '04n': '☁',
        '09d': '🌧',
        '09n': '🌧',
        '10d': '🌦',
        '10n': '🌦',
        '11d': '🌩',
        '11n': '🌩',
        '13d': '❄',
        '13n': '❄',
        '50d': '🌫',
        '50n': '🌫',
    },

    getFromAPI: function(url) {
        $('#weather-spinner').show()
        $('#weather-card, #weather-alert').hide()

        $.ajax(url, {
            method: 'GET'
        })
            .done(function(data) {
                weather.forecast = data.list
                weather.iterator = 0

                weather.displayWeatherFromIterator()

                $('#weather-city').text(data.city.name)

                $('#weather-spinner').hide()
                $('#weather-card').show()
            })
            .fail(function() {
                $('#weather-spinner').hide()
                $('#weather-alert').show()
            })
    },

    getFromAPIFromCity: function(cityName) {
        var url = weather.APIUrl + '&q=' + cityName
        weather.getFromAPI(url)
    },

    getFromAPIFromPosition: function(position) {
        var url = weather.APIUrl + '&lat=' + position.coords.latitude + '&lon=' + position.coords.longitude
        weather.getFromAPI(url)
    },

    displayWeatherFromIterator: function() {
        var currentWeather = weather.forecast[weather.iterator]

        var icon = weather.getEmojiFromIconCode(currentWeather.weather[0].icon)
        var temp = Math.round(currentWeather.main.temp) + '°C'
        var date = new Date(currentWeather.dt_txt)

        $('#weather-icon').text(icon)
        $('#weather-description').text(currentWeather.weather[0].description)
        $('#weather-temp').text(temp)
        $('#weather-date').text(date.toLocaleString())
    },

    incrementInterator: function() {
        if (weather.iterator < weather.forecast.length) {
            weather.iterator += 1
            weather.displayWeatherFromIterator()
        }
    },

    decrementInterator: function() {
        if (weather.iterator > 0) {
            weather.iterator -= 1
            weather.displayWeatherFromIterator()
        }
    },

    getEmojiFromIconCode: function(iconCode) {
        return weather.emojiIcons[iconCode]
    },

    searchFromForm: function(event) {
        event.preventDefault()

        var city = $('#weather-search-city').val()
        weather.getFromAPIFromCity(city)
    },

    getLocation: function(event) {
        event.preventDefault()

        $('#weather-spinner').show()
        $('#weather-card, #weather-alert').hide()
    
        navigator.geolocation.getCurrentPosition(weather.locationSuccess, weather.locationError)
    },

    locationSuccess: function(position) {
        weather.getFromAPIFromPosition(position)
    },

    // onError Callback receives a PositionError object
    locationError: function(error) {
        $('#weather-alert').show()
        $('#weather-spinner').hide()

        console.error(error)
    },
}
