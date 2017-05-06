var app = angular.module('app', ['ngRoute', 'firebase']);

// ngRoute
app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider.when('/', {
        controller: "loginCtrl",
        templateUrl: "views/login.html"
    })
    .when('/register', {
        controller: "registerCtrl",
        templateUrl: "views/register.html"
    })
    .when('/home', {
      templateUrl: "views/home.html"
    })
}]);

// [0]Auth Controller
app.controller("AuthCtrl", function ($scope, $firebaseObject) {
    var ref = firebase.database().ref();
    $scope.data = $firebaseObject(ref);
});

// Auth
app.factory("Auth", ["$firebaseAuth", function ($firebaseAuth) {
      return $firebaseAuth();
}]);

// [1]Auth Controller
app.controller("AuthCtrl", ["$scope", "Auth", function($scope, Auth) {
    $scope.auth = Auth;

    $scope.auth.$onAuthStateChanged(function(firebaseUser) {
        $scope.firebaseUser = firebaseUser;
    });
}]);

// Login Controller
app.controller("loginCtrl", ["$scope", "Auth", function ($scope, Auth) {
      $scope.login = function () {
          //Logowanie
          Auth.$signInWithEmailAndPassword($scope.email, $scope.pass)
          .then(function (user) {
              location.replace('#!/home');
              console.log("Signed in as:", user.uid);
          }).catch(function (error) {
              console.error("Authentication failed:", error);
          });
      };
}]);

// Register Controller
app.controller("registerCtrl", ["$scope", "Auth", function ($scope, Auth) {
      $scope.register = function () {
          //Rejestracja
          Auth.$createUserWithEmailAndPassword($scope.email, $scope.pass)
          .then(function (user) {
              location.replace('#!/home');
              console.log("User created:", user.uid);
          }).catch(function (error) {
              console.error(error);
          });
      };
}]);
