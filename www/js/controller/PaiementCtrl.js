app.controller('PaiementCtrl', function ($scope, $http) {


    $scope.data = {};

    var url = 'https://ogone.test.v-psp.com/ncol/test/orderdirect.asp?' + PSPID + USERID + PSWD + ORDERID + AMOUNT + CURRENCY + CARDNO + ED + CVC + OPERATION;

    var PSPID = 'tiktaktest';
    var USERID = 'tiktaktest';
    var PSWD = 'Wikilaplusbelle1.';
    var ORDERID = 'ABREF123';
    var AMOUNT = '45';
    var CURRENCY = 'Euro';
    var CARDNO = '4111111111111111';
    var ED = '12/06';
    var CVC = '';
    var OPERATION = '';

    $http({
        method: 'POST',
        url: url
    }).then(function successCallback(response) {
        console.log(response.data);
    }, function errorCallback(response) {
        console.log('error', response);
    });


});
