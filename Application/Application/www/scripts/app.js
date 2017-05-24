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





// Register Controller
app.controller("registerCtrl", ["$timeout", "$scope", "Auth", function ($timeout, $scope, Auth) {
      var hide = function() {
        $scope.errorMessage = false;
      }

      $scope.register = function () {
          //Rejestracja
          Auth.$createUserWithEmailAndPassword($scope.email, $scope.pass)
          .then(function (user) {
              location.replace('#!/home');
              console.log("User created:", user.uid);
          }).catch(function (error) {
            //Możliwe błędy
            var errorCode = error.code;
            if(errorCode == 'auth/email-already-in-use') {
              $scope.errorMessage = 'BŁĄD! Email już wykorzystany.';
            } else if(errorCode == 'auth/invalid-email') {
              $scope.errorMessage = 'BŁĄD! Email nieprawidłowy.';
            } else if(errorCode == 'auth/weak-password') {
              $scope.errorMessage = 'BŁĄD! Hasło niewystarczająco silne.';
            } else {
              $scope.errorMessage = 'BŁĄD! Coś poszło nie tak.';
            }
            console.log(error);
            $timeout(hide, 3000);
          });
      };
}]);

// Home Controller
app.controller("homeCtrl", ["$scope", "Auth", function($scope, Auth) {
  // code
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
