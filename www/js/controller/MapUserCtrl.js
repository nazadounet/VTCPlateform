app.controller('MapUserCtrl', function ($scope, InitMapFactory, GetGeolocationFactory, GetDirectionFactory) {


    /***************************** GOOGLE MAP SECTION *******************************************/

    var directionsDisplay = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;

    // load map when the ui is loaded
    $scope.init = function () {
        InitMapFactory.initializeMap(directionsDisplay, directionsService);
    };
    GetGeolocationFactory.getGeolocation()
        .then(function (response) {
            //console.log(response)
        }, function (msg) {
            console.log(msg)
        });

    /***************************** GOOGLE MAP SECTION *******************************************/

    /** PARTI 1 START ROUTE AND CHOOSE OPTION CAR AND SEXE **/
    /*Part input for direction management choose*/
    $scope.interfaceMapUSer = {
        'startDirectionStep': true,
        'endDirectionStep': false,
        'validationCourseStep': false,
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

        $scope.start = document.getElementById('start').value;

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

        $scope.end = document.getElementById('end').value;

        $scope.interfaceMapUSer.startDirectionStep = false;
        $scope.interfaceMapUSer.endDirectionStep = false;
        $scope.interfaceMapUSer.validationCourseStep = true;

        var paris = 'madrid';
        var londres = 'londres';

        GetDirectionFactory.getRoute(directionsDisplay, directionsService, paris, londres)
            .then(function (route) {
                console.log(route);
            }, function (msg) {
                console.log(msg);
            });
    }
});
