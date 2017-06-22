app.controller('MapUserCtrl', function($scope, $cordovaGeolocation, $ionicPlatform){

/***************************** GOOGLE MAP SECTION *******************************************/
  var options = {timeout: 10000, enableHighAccuracy: true};

  $scope.price ='';

  function initialize() {

    $cordovaGeolocation
      .getCurrentPosition(options)
      .then(function (position) {
        var lat  = position.coords.latitude;
        var long = position.coords.longitude;


        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;

        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          center: {lat: lat, lng: long},
          disableDefaultUI: true
        });


        directionsDisplay.setMap(map);

        var myLatLng = {lat: position.coords.latitude, lng: position.coords.longitude}

        var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          icon: "../../img/Social_Media_Socialmedia_network_share_socialnetwork_network-14-512.png"
        });

        //function allow to get the route Direction dealing with google map api
        $scope.getRoute = function() {
          calculateAndDisplayRoute(directionsService, directionsDisplay);
        };
      }, function(err) {
        console.log(err);
      });

  }
  // load map when the ui is loaded
  $scope.init = function() {
    initialize();
  };

  function calculateAndDisplayRoute(directionsService, directionsDisplay) {

    var start = $scope.start;
    var end = $scope.end;

    console.log( $scope.start + ' ' + $scope.end);
    directionsService.route({
      origin: start,
      destination: end,
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
        console.log(response.routes[0].legs[0].distance);
        $scope.price = Math.round(response.routes[0].legs[0].distance.value * 0.00102 + 1.20);
        console.log($scope.price);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
/***************************** GOOGLE MAP SECTION *******************************************/

/** PARTI 1 START ROUTE AND CHOOSE OPTION CAR AND SEXE **/
 /*Part input for direction management choose*/
  $scope.interfaceMapUSer = {
    'startDirectionStep' : true,
    'endDirectionStep' : false,
    'validationCourseStep': false,
  };

  $scope.backSteps = function () {
    if($scope.interfaceMapUSer.endDirectionStep == true){
      $scope.interfaceMapUSer.endDirectionStep = false;
      $scope.interfaceMapUSer.startDirectionStep = true;
    }else if($scope.interfaceMapUSer.validationCourseStep == true){
      $scope.interfaceMapUSer.validationCourseStep = false;
      $scope.interfaceMapUSer.endDirectionStep = true;
    }
  };

  /*Part sexe choose*/
  $scope.sexe = {
    'maleTaped': false,
    'femelTaped': false,
  };

  $scope.maleTaped = function () {
    if($scope.sexe.maleTaped == false && $scope.sexe.femelTaped == true){
      $scope.sexe.maleTaped = true;
    }else if ($scope.sexe.maleTaped == true && $scope.sexe.femelTaped == true) {
      $scope.sexe.maleTaped = false;
    }else if($scope.sexe.maleTaped == false && $scope.sexe.femelTaped == false){
      $scope.sexe.maleTaped = true;
    }
  };

  $scope.femelTaped = function () {
    if($scope.sexe.femelTaped == false && $scope.sexe.maleTaped == true){
      $scope.sexe.femelTaped = true;
    }else if ($scope.sexe.femelTaped == true && $scope.sexe.maleTaped == true) {
      $scope.sexe.femelTaped = false;
    }else if($scope.sexe.femelTaped == false && $scope.sexe.maleTaped == false){
      $scope.sexe.femelTaped = true;
    }
  };
  /* END Part sexe choose*/

  /*Part categorie car choose*/
  $scope.carCategorie = {
    'standarTaped' : true,
    'luxTaped' : false,
    'vanTaped' :false,
  };

  $scope.standarTaped = function () {
    if($scope.carCategorie.standarTaped == false){
      $scope.carCategorie = {
        'standarTaped' : true,
        'luxTaped' : false,
        'vanTaped' : false,
      };
    }
  };

  $scope.luxTaped = function () {
    if($scope.carCategorie.luxTaped == false){
      $scope.carCategorie = {
        'standarTaped' : false,
        'luxTaped' : true,
        'vanTaped' : false,
      };
    }
  };

  $scope.vanTaped = function () {
    if($scope.carCategorie.vanTaped == false){
      $scope.carCategorie = {
        'standarTaped' : false,
        'luxTaped' : false,
        'vanTaped' : true,
      };
    }
  };
  /*Part categorie car choose*/

  /*Part Button "Valider Départ" to seconde Step*/
  $scope.toEndDirectionStep = function () {

    $scope.start = document.getElementById('start').value;

    $scope.interfaceMapUSer.startDirectionStep = false;
    $scope.interfaceMapUSer.endDirectionStep = true;

    if($scope.carCategorie.standarTaped == true){
      $scope.recapCarText = 'Eco';
    }else if($scope.carCategorie.luxTaped == true){
      $scope.recapCarText = 'Lux';
    }else if($scope.carCategorie.vanTaped == true){
      $scope.recapCarText = 'Van';
    }

    if($scope.sexe.femelTaped == true && $scope.sexe.maleTaped == false){
      $scope.recapSexeText = 'féminin';
    }else if($scope.sexe.maleTaped == true && $scope.sexe.femelTaped == false){
      $scope.recapSexeText = 'masculin';
    }else if($scope.sexe.femelTaped == true && $scope.sexe.maleTaped == true){
      $scope.recapSexeTaped = '';
    }
  };
  /*Part Button "Valider Départ" to seconde Step*/

/** END PARTI 1 START ROUTE AND CHOOSE OPTION CAR AND SEXE **/


/**  PARTI 2 END ROUTE AND CHOOSE OPTION CAR AND SEXE **/
 /*Part payement choose*/
  $scope.payementChecked ={
    'cardCheked': false,
    'cashCheked': false
  };

  $scope.cardTaped = function () {
    if($scope.payementChecked.cardCheked != true){
      $scope.payementChecked.cardCheked = true;
      $scope.payementChecked.cashCheked = false;
    }
  };

  $scope.cashTaped = function () {
    if($scope.payementChecked.cashCheked != true){
      $scope.payementChecked.cashCheked = true;
      $scope.payementChecked.cardCheked = false;
    }
  };
 /*Part payement choose*/
/**  END PARTI 2 END ROUTE AND CHOOSE OPTION CAR AND SEXE **/

  $scope.toValidationCourseStep = function () {

    $scope.end = document.getElementById('end').value;

    $scope.interfaceMapUSer.startDirectionStep = false;
    $scope.interfaceMapUSer.endDirectionStep = false;
    $scope.interfaceMapUSer.validationCourseStep = true;

    $scope.getRoute();
  }
});
