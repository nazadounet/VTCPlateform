app.factory('GeocodingFactory', function ($http, $q) {

    var deferred = $q.defer();

    var geocodingUrl = 'https://maps.googleapis.com/maps/api/geocode/json?';

    var coordonates = 'latlng=';

    var geocodinfApiKey = '&key=AIzaSyDZo7QmSYquSwqOCRPi3hNvGNXnojNSeYI';

    return {

        getAddressFromGps: function (lat, long) {
            var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long + '&key=AIzaSyDZo7QmSYquSwqOCRPi3hNvGNXnojNSeYI'
            $http.get(url)
                .then(function (response) {
                    deferred.resolve(response);
                }, function (msg) {
                    console.log('GeocodingFactory -- erreur lors de récupération de l\'adresse depuis GPS :' + msg)
                });
            return deferred.promise;
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

    }

});