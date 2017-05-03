var app = angular.module('app', ['ngRoute', 'firebase']);

app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider.when('/', {
        controller: "loginCtrl",
        templateUrl: "views/login.html"
    })
    .when('/register', {
        controller: "registerCtrl",
        templateUrl: "views/register.html"
    })
    .otherwise({
        redirectTo: '/'
    });
}]);

app.controller("AuthCtrl", function ($scope, $firebaseObject) {
    var ref = firebase.database().ref();
    $scope.data = $firebaseObject(ref);
});

app.factory("Auth", ["$firebaseAuth",
  function ($firebaseAuth) {
      return $firebaseAuth();
  }
]);

app.controller("loginCtrl", ["$scope", "Auth",
  function ($scope, Auth) {
      $scope.login = function () {
          //Logowanie
          Auth.$signInWithEmailAndPassword($scope.email, $scope.pass)
          .then(function (user) {
              console.log("Signed in as:", user.uid);
          }).catch(function (error) {
              console.error("Authentication failed:", error);
          });
      };
  }
]);

app.controller("registerCtrl", ["$scope", "Auth",
  function ($scope, Auth) {
      $scope.register = function () {
          //Rejestracja
          Auth.$createUserWithEmailAndPassword($scope.email, $scope.pass)
          .then(function (user) {
              console.log("User created:", user.uid);
          }).catch(function (error) {
              console.error(error);
          });
      };
  }
]);