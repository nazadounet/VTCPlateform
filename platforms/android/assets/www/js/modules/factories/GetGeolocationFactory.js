app.factory('GetGeolocationFactory', function ($cordovaGeolocation, $q) {

    var factory ={

        getGeolocation : function () {

            var deferred = $q.defer();

            var options = {timeout: 10000, enableHighAccuracy: true};

            $cordovaGeolocation
                .getCurrentPosition(options)
                .then(function (position) {
                    deferred.resolve(position);
                }, function (err) {
                    console.log(err);
                });
            return deferred.promise;
        }
    };

    return factory;
});