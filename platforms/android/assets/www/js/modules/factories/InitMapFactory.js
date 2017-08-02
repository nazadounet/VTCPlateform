app.factory('InitMapFactory', function (GetGeolocationFactory, GeocodingFactory, GoogleMapMarkerFactory, $q) {

    var deffered = $q.defer();

    var marker = {};

    var map = {};

    /*initial cordonates*/
    var formatedAddress ;
    var lat;
    var long;
    /*initial cordonates*/

    //define 2 variable used by google map to get and display direction, they are send to the service InitMap
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;

    var factory = {

        initializeMap: function (directionsDisplay, directionsService) {

            GetGeolocationFactory.getGeolocation() // call this factory who return the current position of the user
                .then(function (response) {

                    lat = response.coords.latitude;
                    long = response.coords.longitude;

                    GeocodingFactory.getAddressFromGps(lat, long) // call this factory who request the reverseGoeocoding to get formated address
                        .then(function (response) {

                            formatedAddress = response.data.results[0].address_components[0].long_name + ' ' + response.data.results[0].address_components[1].long_name + ', ' + response.data.results[0].address_components[2].long_name;

                            console.log(formatedAddress);

                            deffered.resolve(formatedAddress);// return formated addresse
                            initialFormatedAddress = response.data.results[0].formatted_address;
                        }, function (msg) {
                            console.log('Error -- MapDirectionFactory -- getAddress: ' + msg)
                        });
                    
                    //generate the map
                    map = new google.maps.Map(document.getElementById('map'), {
                        zoom: 13,
                        maxZoom : 14,
                        center: {lat: lat, lng: long},
                        disableDefaultUI: true
                    });

                    marker = GoogleMapMarkerFactory.userMarker(lat, long, map); // call this factory to generate a marker


                    var inputStart = /** @type {!HTMLinputElement} */(
                        document.getElementById('start'));

                    var autocompleteStart = new google.maps.places.Autocomplete(inputStart);
                    autocompleteStart.bindTo('bounds', map);
                    
                    autocompleteStart.addListener('place_changed', function () {
                        var place = autocompleteStart.getPlace();
                        if (!place.geometry) {
                            // User entered the name of a Place that was not suggested and
                            // pressed the Enter key, or the Place Details request failed.
                            window.alert("No details available for inputStart: '" + place.name + "'");
                        }
                    });

                    var inputEnd = /** @type {!HTMLinputEndElement} */(
                        document.getElementById('end'));

                    var autocompleteEnd = new google.maps.places.Autocomplete(inputEnd);
                    autocompleteEnd.bindTo('bounds', map);

                    autocompleteEnd.addListener('place_changed', function () {
                        var place = autocompleteEnd.getPlace();
                        if (!place.geometry) {
                            // User entered the name of a Place that was not suggested and
                            // pressed the Enter key, or the Place Details request failed.
                            window.alert("No details available for inputEnd: '" + place.name + "'");
                        }
                    });

                    directionsDisplay.setMap(map); //user by google map direction

                }, function (msg) {
                    console.log('Echec de la récupération des donnée GPS : ' + msg)
                });
            return deffered.promise; // this promise return the current user position with a formated addresse
        },

        // on recupere la position actuel du marker, afin d'eviter une requête inutil si l'user n'a pas déplacé le marker
        actualiseCurrentUserPosition : function (currentMarkerPosition) {

            if(currentMarkerPosition != formatedAddress){
                console.log('rechargement de la position');
                GetGeolocationFactory.getGeolocation()
                .then(function (response) {
                    marker.setPosition({lat: response.coords.latitude, lng : response.coords.longitude});
                    map.panTo({lat: response.coords.latitude, lng : response.coords.longitude});
                    map.setZoom(13);
                    deffered.resolve(response);
                }, function (msg) {
                    console.log('Error : ' + msg);
                })
            }else{
                console.log('pas rechargement de la positions');
                map.panTo({lat : lat, lng : long});
                map.setZoom(13);
            }
            return deffered.promise;
        },

        hideMarkerWhenCourseStart : function () {
            GoogleMapMarkerFactory.hideMarker();
            console.log('Marker Hidden');
        },

        displayMarkerWhenNoCourse : function () {
            GoogleMapMarkerFactory.displayMarker();
            console.log('Marker Displayed');
        }
    };

    return factory;


});