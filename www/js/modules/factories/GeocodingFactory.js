app.factory('GeocodingFactory', function ($http, $q) {

    var deferred = $q.defer();

    var factory = {

        //first function who try to get formated addrese from GPS coordonates
        getAddressFromGps: function (lat, long) {
            var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long + '&key=AIzaSyDZo7QmSYquSwqOCRPi3hNvGNXnojNSeYI';
            $http.get(url)
                .then(function (response) {
                    deferred.resolve(response);// return a promise with results from Google Geocoding API
                }, function (msg) {
                    console.log('GeocodingFactory -- erreur lors de récupération de l\'adresse depuis GPS :' + msg)
                });
            return deferred.promise;// return result, he's catcher by initmapService then returned to controller to display addresse in view
        },

        getGpsFromAddress: function (streetNb, streetName, city) {
            var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + streetNb + streetName + ',' + city + ',' + 'CA&key=AIzaSyDZo7QmSYquSwqOCRPi3hNvGNXnojNSeYI';
            $http.get(url)
                .then(function (response) {
                    //succes
                    //defered.resolve(reponse);
                }, function (msg) {
                    //fail
                    //defered.reject('erreur');
                });
            return deferred.promise;
        }
    };

    return factory;

});