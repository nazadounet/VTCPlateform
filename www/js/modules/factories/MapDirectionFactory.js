app.factory('MapDirectionFactory', function ($cordovaGeolocation, $q, MapDisplayFactory) {

    var directionsDisplay = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;

    return {

        initializeMap: function () {


            //var directionsDisplay = new google.maps.DirectionsRenderer;
            //var directionsService = new google.maps.DirectionsService;

            var options = {timeout: 10000, enableHighAccuracy: true};
            $cordovaGeolocation
                .getCurrentPosition(options)
                .then(function (position) {

                    var lat = position.coords.latitude;
                    var long = position.coords.longitude;

                    //var map = MapDisplayFactory.googleMapObject(lat, long);


                     var map = new google.maps.Map(document.getElementById('map'), {
                     zoom: 13,
                     center: {lat: lat, lng: long},
                     disableDefaultUI: true
                     });



                    directionsDisplay.setMap(map);

                    var myLatLng = {lat: position.coords.latitude, lng: position.coords.longitude};

                    var marker = new google.maps.Marker({
                        position: myLatLng,
                        map: map,
                        icon: "../../img/Social_Media_Socialmedia_network_share_socialnetwork_network-14-512.png"
                    });

                    //function allow to get the route Direction dealing with google map api
                }, function (err) {
                    console.log(err);
                });
        },

        getRoute: function (paris, londres) {

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
                    response = result;
                    deferred.resolve(response);
                } else {
                    deferred.reject('error to get route :' + status);
                }
            });
            return deferred.promise;
        }
    }
});