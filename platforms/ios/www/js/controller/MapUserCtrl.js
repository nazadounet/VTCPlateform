app.controller('MapUserCtrl', function ($scope, InitMapFactory, GetTimeTravel, GetDirectionFactory){

    $scope.userData = {
        'markerPosition' : '',
        'destination' : ''
    };

    /***************************** GOOGLE MAP SECTION *******************************************/

        //define 2 variable used by google map to get and display direction, they are send to the service InitMap
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;

    var wayPoints = [];

    $scope.init = function () {
        InitMapFactory.initializeMap(directionsDisplay, directionsService) //call the service to generate map
            .then(function (response) {
                $scope.userData.markerPosition = response;
            }, function (msg) {
                console.log('From MapUserCtrl - getting error: ' + msg)
            });
    };

    $scope.reGeolocation = function () {
        console.log('controller : ', $scope.userData.markerPosition);
            //ici on inject la position actuel du marker cf InitMapFactory.actualiseCurrentUserPosition
        InitMapFactory.actualiseCurrentUserPosition($scope.userData.markerPosition)
            .then(function () {
                console.log('reGeolocation done')
            }, function (msg) {
                console.log('MapUserCtrl - reGeolocation error : ' + msg);
            });
    };

    //listen the googleMarkerFactory, to get the changed position of the dragable marker made by user.
    $scope.$on('markerDraged', function (event, args) {
        $scope.userData.markerPosition = args; // here we catch the new marker position from the event 'markerDraged'.
        console.log($scope.userData.markerPosition);
    });

    /***************************** GOOGLE MAP SECTION *******************************************/

    /** PARTI 1 START ROUTE AND CHOOSE OPTION CAR AND SEXE **/
    /*Part input for direction management choose*/
    $scope.interfaceMapUSer = {
        'startDirectionStep': true,
        'endDirectionStep': false,
        'validationCourseStep': false
    };

    $scope.backSteps = function () {
        if ($scope.interfaceMapUSer.endDirectionStep == true) {
            $scope.interfaceMapUSer.endDirectionStep = false;
            $scope.interfaceMapUSer.startDirectionStep = true;
        } else if ($scope.interfaceMapUSer.validationCourseStep == true) {
            $scope.interfaceMapUSer.validationCourseStep = false;
            $scope.interfaceMapUSer.endDirectionStep = true;
        }
    };

    /*Part sexe choose*/
    $scope.sexe = {
        'maleTaped': false,
        'femelTaped': false
    };

    $scope.maleTaped = function () {
        if ($scope.sexe.maleTaped == false && $scope.sexe.femelTaped == true) {
            $scope.sexe.maleTaped = true;
        } else if ($scope.sexe.maleTaped == true && $scope.sexe.femelTaped == true) {
            $scope.sexe.maleTaped = false;
        } else if ($scope.sexe.maleTaped == false && $scope.sexe.femelTaped == false) {
            $scope.sexe.maleTaped = true;
        }
    };

    $scope.femelTaped = function () {
        if ($scope.sexe.femelTaped == false && $scope.sexe.maleTaped == true) {
            $scope.sexe.femelTaped = true;
        } else if ($scope.sexe.femelTaped == true && $scope.sexe.maleTaped == true) {
            $scope.sexe.femelTaped = false;
        } else if ($scope.sexe.femelTaped == false && $scope.sexe.maleTaped == false) {
            $scope.sexe.femelTaped = true;
        }
    };
    /* END Part sexe choose*/

    /*Part categorie car choose*/
    $scope.carCategorie = {
        'standarTaped': true,
        'luxTaped': false,
        'vanTaped': false
    };

    $scope.standarTaped = function () {
        if ($scope.carCategorie.standarTaped == false) {
            $scope.carCategorie = {
                'standarTaped': true,
                'luxTaped': false,
                'vanTaped': false
            };
        }
    };

    $scope.luxTaped = function () {
        if ($scope.carCategorie.luxTaped == false) {
            $scope.carCategorie = {
                'standarTaped': false,
                'luxTaped': true,
                'vanTaped': false
            };
        }
    };

    $scope.vanTaped = function () {
        if ($scope.carCategorie.vanTaped == false) {
            $scope.carCategorie = {
                'standarTaped': false,
                'luxTaped': false,
                'vanTaped': true
            };
        }
    };
    /*Part categorie car choose*/

    /*Part Button "Valider Départ" to seconde Step*/
    $scope.toEndDirectionStep = function () {

        $scope.userData.markerPosition = document.getElementById('start').value;
        wayPoints.push({location : document.getElementById('wayPoint').value});

        $scope.interfaceMapUSer.startDirectionStep = false;
        $scope.interfaceMapUSer.endDirectionStep = true;

        if ($scope.carCategorie.standarTaped == true) {
            $scope.recapCarText = 'Eco';
        } else if ($scope.carCategorie.luxTaped == true) {
            $scope.recapCarText = 'Lux';
        } else if ($scope.carCategorie.vanTaped == true) {
            $scope.recapCarText = 'Van';
        }

        if ($scope.sexe.femelTaped == true && $scope.sexe.maleTaped == false) {
            $scope.recapSexeText = 'féminin';
        } else if ($scope.sexe.maleTaped == true && $scope.sexe.femelTaped == false) {
            $scope.recapSexeText = 'masculin';
        } else if ($scope.sexe.femelTaped == true && $scope.sexe.maleTaped == true) {
            $scope.recapSexeTaped = '';
        }
    };
    /*Part Button "Valider Départ" to seconde Step*/

    /** END PARTI 1 START ROUTE AND CHOOSE OPTION CAR AND SEXE **/


    /**  PARTI 2 END ROUTE AND CHOOSE OPTION CAR AND SEXE **/
    /*Part payement choose*/
    $scope.payementChecked = {
        'cardCheked': false,
        'cashCheked': false
    };

    $scope.cardTaped = function () {
        if ($scope.payementChecked.cardCheked != true) {
            $scope.payementChecked.cardCheked = true;
            $scope.payementChecked.cashCheked = false;
        }
    };

    $scope.cashTaped = function () {
        if ($scope.payementChecked.cashCheked != true) {
            $scope.payementChecked.cashCheked = true;
            $scope.payementChecked.cardCheked = false;
        }
    };
    /*Part payement choose*/
    /**  END PARTI 2 END ROUTE AND CHOOSE OPTION CAR AND SEXE **/

    $scope.toValidationCourseStep = function () {

        $scope.userData.destination = document.getElementById('end').value;

        $scope.interfaceMapUSer.startDirectionStep = false;
        $scope.interfaceMapUSer.endDirectionStep = false;
        $scope.interfaceMapUSer.validationCourseStep = true;

        var start = $scope.userData.markerPosition;
        var end = $scope.userData.destination;

        GetDirectionFactory.getRoute(directionsDisplay, directionsService, start, end, wayPoints);

        GetTimeTravel.getTimeTravel(start, end)
            .then(function (reponse) {
              console.log(reponse);
            }, function (msg) {
                console.log('From MapUserCtrl - getDirection/travelData failed : ' + msg);
            });
    }
});
