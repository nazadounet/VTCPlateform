app.factory('MapDisplayFactory', function () {

    return{

        googleMapObject : function (lat, long) {

            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 13,
                center: {lat: lat, lng: long},
                disableDefaultUI: true
            });

        }

    }
});