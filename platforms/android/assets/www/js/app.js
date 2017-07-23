var app = angular.module('starter', ['ionic', 'ngCordova']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});


app.config(function($stateProvider, $urlRouterProvider) {


  $stateProvider

    .state('Test', {
    url: '/test',
    templateUrl: 'templates/test.html',
    controller: 'TestCtrl'
  })
    .state('Link', {
    url: '/link',
    templateUrl: 'templates/link.html'
  })
    .state('SignUp', {
    url: '/SignUp',
    templateUrl: 'templates/signUp.html',
    controller: 'SignUpCtrl'
  })
    .state('MapUser', {
    url: '/MapUser',
    templateUrl: 'templates/mapUser.html',
    controller: 'MapUserCtrl'
  })
    .state('Card', {
    url: '/card',
    templateUrl: 'templates/card.html',
    controller: 'PaiementCtrl'
  });

  /************************* SIHAME *********************************/

  $stateProvider.state('home',{
    url : '/home',
    templateUrl: 'templates/home.html'
  });

  // page 1 = page de garde quand l'user va se connecté  //
  $stateProvider.state('inscription',{
    url : '/inscription',
    templateUrl: 'templates/inscription.html'
  });

  $stateProvider.state('paiement',{
    url : '/paiement',
    templateUrl: 'templates/paiement.html'
  });

  $stateProvider.state('profil',{
    url : '/profil',
    templateUrl: 'templates/profil.html'
  });

  $stateProvider.state('aide',{
    url : '/aide',
    templateUrl: 'templates/aide.html'
  });

  $stateProvider.state('litige',{
    url : '/litige',
    templateUrl: 'templates/litige.html',
    controller:'HelpCtrl'
  });

  $stateProvider.state('historique',{
    url : '/historique',
    templateUrl: 'templates/historique.html'
  });

  $stateProvider.state('aideAutre',{
    url : '/aideAutre',
    templateUrl: 'templates/aideAutre.html'
  });
  /************************* SIHAME *********************************/


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/link');
});