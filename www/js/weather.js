var weather = {
    APIUrl: 'https://api.openweathermap.org/data/2.5/weather?APPID=c612b85f3be89e4849cb46bb755f8eb8&units=metric&lang=fr',

    getFromAPI: function(cityName) {
        var url = weather.APIUrl + '&q=' + cityName

        $('#weather-spinner').show()
        $('#weather-row, #weather-alert').hide()

        $.ajax(url, {
            method: 'GET'
        })
            .done(function(data) {
                var icon = weather.getEmojiFromIconCode(data.weather[0].icon)
                var temp = Math.round(data.main.temp) + '°C'

                $('#weather-icon').text(icon)
                $('#weather-description').text(data.weather[0].description)
                $('#weather-city').text(data.name)
                $('#weather-temp').text(temp)

                $('#weather-spinner').hide()
                $('#weather-row').show()
            })
            .fail(function() {
                $('#weather-spinner').hide()
                $('#weather-alert').show()
            })
    },

    getEmojiFromIconCode: function(iconCode) {
        var emojiIcons = {
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
        }

        return emojiIcons[iconCode]
    },

    searchFromForm: function(event) {
        event.preventDefault()

        var city = $('#weather-search-city').val()
        weather.getFromAPI(city)
    },
}
