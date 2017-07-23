app.factory('GetTimeTravel', function ($q) {

    var deferred = $q.defer();

    var factory = {

        getTimeTravel: function (start, end) {

            var travelData = {};

            var service = new google.maps.DistanceMatrixService();
            service.getDistanceMatrix(
                {
                    origins: [start],
                    destinations: [end],
                    travelMode: 'DRIVING',
                    avoidHighways: false,
                    avoidTolls: true
                }, function (response, status) {
                    if (status == 'OK') {
                        travelData.secondeTimeTravel = response.rows[0].elements[0].duration.value;
                        travelData.distanceText = response.rows[0].elements[0].distance.text;
                        travelData.distanceValue = response.rows[0].elements[0].distance.value;

                        deferred.resolve(travelData);
                    } else {
                        console.log('GetTimeTravel Error: ' + status)
                    }
                });
            return deferred.promise;
        }
    };
    return factory;

});