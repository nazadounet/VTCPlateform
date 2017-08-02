app.factory('GoogleMapMarkerFactory', function ($rootScope) {


    var marker = {};

    var factory = {

        userMarker: function (lat, long, map) {

            marker = new google.maps.Marker({
                position: {lat: lat, lng: long},
                map: map,
                draggable: true,
                icon: "../../img/Social_Media_Socialmedia_network_share_socialnetwork_network-14-512.png"
            });

            var geocoder = new google.maps.Geocoder();

            //here the listener who will check for any change on the marker
            google.maps.event.addListener(marker, "dragend", function (e) {
                geocoder.geocode({'latLng': marker.getPosition()}, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        //on change, we send a event to the scope, cacthed by controller
                        $rootScope.$broadcast('markerDraged', results[0].formatted_address);
                    } else {
                        console.log('From MarkerFactory - error dragend marker :' + result + status)
                    }
                });
            });
            return marker;
        },

        hideMarker : function () {
            marker.setVisible(false);
        },

        displayMarker : function () {
            marker.setVisible(true);
        }
    };

    return factory


});