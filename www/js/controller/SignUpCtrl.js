app.controller('SignUpCtrl', function ($scope, $http, $httpParamSerializer, $compile) {

  const api_url ="http://localhost:8888/Api-ti-tak/public/api/v1/userprofil";


  $scope.signUp = function (firstname, lastname) {

    var signUpData = {
      'firstname' : firstname,
      'lastname' : lastname,
    };

    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    $http.post(api_url, $httpParamSerializer(signUpData))
      .success(function(response){
        console.log(response);
      })
      .error(function(response){
        console.log(response);
      })
  }

});
