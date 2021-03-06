
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        console.log('device is ready')

        // $('#weather-retry').click(function() {
        //     weather.getFromAPI('Nancy')
        // })

        $('#search-city-form').submit(weather.searchFromForm)

        $('#locate-me-button').click(weather.getLocation)

        $('#weather-prev').click(weather.decrementInterator)
        $('#weather-next').click(weather.incrementInterator)
    },
};

app.initialize();