/**
 * Created by Ankit on 04/05/16.
 */
(function (){

    $(".button-collapse").sideNav();
    $('.parallax').parallax();

    var latitude,
        longitude,
        kelvin,
        fahrenheit,
        celsius,
        openWeatherAppId = '2f99fd87d81ab3b8cec2de2326d46986',
        temp = $("#temperatureCelcius"),
        tempButton = $("#tempChange"),
        degree = 'C',
        degree1 = 'F',
        locationFinal =$('#location'),
        refresh = $('#refreshWeather'),
        moreButton = $('#moreDetail'),
        humidity = $('#humidity'),
        windSpeed = $('#wind'),
        weatherDesc = $('#weather'),
        weatherIcon = $('#weatherIcon'),
        morepane = $('#morePane');


    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(showPosition , showError);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }       //End getLocation
    function showPosition(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;


        if((locationFinal.html() === '' ) || (temp.html() === '') || (humidity.html() === '' ) || (windSpeed.html() === '') || (weatherDesc.html() === '' ) || (weatherIcon.html() === '')) {
            getWeather();
        }
    }       // End showPosition
    function showError(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                console.log( "User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                console.log("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                console.log("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                console.log("An unknown error occurred.");
                break;
        }
    }       // End showError

    function getWeather(){
        $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=' + latitude +'&lon=' + longitude +'&APPID='+ openWeatherAppId , function(data){
            kelvin = data.main.temp;
            celsius = Math.round(kelvin - 273.15) ;
            fahrenheit = Math.round((kelvin* 1.8 )- 459.67);
            locationFinal.html(data.name +' , ' + data.sys.country);
            temp.html(celsius + '&#176; '+ degree);
            tempButton.html('&#176; '+degree1);
            humidity.html(data.main.humidity +' %');
            windSpeed.html(data.wind.speed + ' meters/sec');
            weatherDesc.html('<h4>'+data.weather[0].main+'</h4>');
            weatherIcon.html("<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'>");


        });
    }       // End getWeather

    function refreshWeather(){
        locationFinal.html('') ;
        temp.html('');
        humidity.html('');
        windSpeed.html('');
        weatherDesc.html('');
        weatherIcon.html('');
        getWeather();

    }
    getLocation();

    tempButton.on('click', function () {
        if(degree == 'C'){
            degree = 'F';
            degree1 = 'C';
            temp.html(fahrenheit + '&#176; ' +degree);
            tempButton.html('&#176; '+degree1);

        }else if(degree == 'F'){
            degree = 'C';
            degree1 ='F';
            temp.html(celsius + '&#176; '+ degree);
            tempButton.html('&#176; '+degree1);
        }
    });




    refresh.on('click',function(){
        refreshWeather();

});
    moreButton.on('click',function(){
        morepane.slideToggle( "slow", function() {
            morepane.toggleClass('hidden');
        });
        if(morepane.hasClass('hidden')){
            moreButton.text("Show Less");
        } else {
            moreButton.text("Show More");
        }

    });
})();
