var app = angular.module('app', ['ngRoute']);

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