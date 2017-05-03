var app = angular.module('app', ['ngRoute', 'firebase']);

app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: "views/login.html"
    })
    .when('/register', {
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
