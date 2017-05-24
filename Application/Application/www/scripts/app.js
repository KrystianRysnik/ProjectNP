var app = angular.module('app', ['ngRoute', 'ngAnimate', 'firebase']);

// ngRoute
app.run(["$rootScope", "$location", function($rootScope, $location) {
  $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
    if (error === "AUTH_REQUIRED") {
      $location.path("/");
    }
  });
}]);

app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider.when('/', {
        controller: "loginCtrl",
        templateUrl: "views/login.html",
        resolve: {
          "currentAuth": ["Auth", function(Auth) {
            return Auth.$waitForSignIn();
          }]
        }
    })
    .when('/register', {
        controller: "registerCtrl",
        templateUrl: "views/register.html",
        resolve: {
          "currentAuth": ["Auth", function(Auth) {
            return Auth.$waitForSignIn();
          }]
        }
    })
    .when('/home', {
      controller: "homeCtrl",
      templateUrl: "views/home.html",
      resolve: {
        "currentAuth": ["Auth", function(Auth) {
          return Auth.$requireSignIn();
        }]
      }
    })
    .when('/account', {
      controller: "accountCtrl",
      templateUrl: "views/account.html",
      resolve: {
        "currentAuth": ["Auth", function(Auth) {
          return Auth.$requireSignIn();
        }]
      }
    })
    .when('/salon', {
      controller: "salonCtrl",
      templateUrl: "views/salon.html",
      resolve: {
        "currentAuth": ["Auth", function(Auth) {
          return Auth.$requireSignIn();
        }]
      }
    })
    .when('/about', {
      templateUrl: "views/about.html",
      resolve: {
        "currentAuth": ["Auth", function(Auth) {
          return Auth.$requireSignIn();
        }]
      }
    })
}]);

// Auth
app.factory("Auth", ["$firebaseAuth", function ($firebaseAuth) {
      return $firebaseAuth();
}]);









// Account Controller
app.controller("accountCtrl", ["$scope", "Auth", function($scope, Auth) {
  
}]);

// Salon Controller
app.controller("salonCtrl", ["$scope", "$location", "Auth", "$firebaseObject", function($scope, $location, Auth, $firebaseObject) {
  var activeSalon = $location.search().activeSalon;

  var ref = firebase.database().ref();
  $scope.salon = $firebaseObject(ref.child('pl_salon').child(activeSalon));
}])
