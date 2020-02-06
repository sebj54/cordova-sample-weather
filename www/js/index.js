
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

        weather.getFromAPI('Nancy')

        $('#weather-retry').click(function() {
            weather.getFromAPI('Nancy')
        })

        $('#search-city-form').submit(weather.searchFromForm)
    },
};

app.initialize();