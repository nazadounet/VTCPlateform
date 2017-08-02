app.factory('GetDirectionFactory', function () {

    var request = {};

    var factory =  {

        getRoute: function (directionsDisplay, directionsService,start, end, wayPoints) {

            if(wayPoints[0].location){
                request = {
                    origin: start,
                    destination: end,
                    travelMode: 'DRIVING',
                    avoidHighways: false,
                    avoidTolls: true,
                    waypoints: wayPoints,
                    optimizeWaypoints: true
                };
            }else{
                request = {
                    origin: start,
                    destination: end,
                    travelMode: 'DRIVING',
                    avoidHighways: false,
                    avoidTolls: true

                };
            }

            directionsService.route(request, function (result, status) {
                if (status == 'OK') {
                    directionsDisplay.setDirections(result);
                } else {
                    console.log('error to get route :' + status);
                }
            });
        }
    };

    return factory;
});