app.factory('GetDirectionFactory', function ($q) {

    return {

        getRoute: function (directionsDisplay, directionsService,paris, londres) {

            var deferred = $q.defer();

            var response;

            // var start = 'paris'; //$scope.start;
            //var end = 'londres';//$scope.end;

            var request = {
                origin: paris,
                destination: londres,
                travelMode: 'DRIVING'
            };

            directionsService.route(request, function (result, status) {
                if (status == 'OK') {
                    directionsDisplay.setDirections(result);
                    response = {
                        'kmDistance' : result.routes[0].legs[0].distance.text,
                        'chiffreDistance' : result.routes[0].legs[0].distance.value
                    };
                    deferred.resolve(response);
                } else {
                    deferred.reject('error to get route :' + status);
                }
            });
            return deferred.promise;
        }

    }

});