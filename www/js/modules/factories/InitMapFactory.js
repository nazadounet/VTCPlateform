app.factory('InitMapFactory', function (GetGeolocationFactory, GeocodingFactory) {

    return {

        initializeMap: function (directionsDisplay, directionsService) {


            GetGeolocationFactory.getGeolocation()
                .then(function (response) {

                    var lat = response.coords.latitude;
                    var long = response.coords.longitude;

                    GeocodingFactory.getAddressFromGps(lat, long)
                        .then(function (response) {
                            console.log(response.data.results[0].formatted_address);
                        }, function (msg) {
                            console.log('Error -- MapDirectionFactory -- getAddress: ' + msg)
                        });

                    var map = new google.maps.Map(document.getElementById('map'), {
                        zoom: 13,
                        center: {lat: lat, lng: long},
                        disableDefaultUI: true
                    });


                   directionsDisplay.setMap(map);

                    var myLatLng = {lat: lat, lng: long};

                    var marker = new google.maps.Marker({
                        position: myLatLng,
                        map: map,
                        icon: "../../img/Social_Media_Socialmedia_network_share_socialnetwork_network-14-512.png"
                    });

                },function (msg) {
                    console.log('Echec de la récupération des donnée GPS : ' + msg)
                });
        }
    }
});