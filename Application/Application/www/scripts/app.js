var app = angular.module('app', ['ngRoute', 'firebase']);

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
    
    
    $scope.auth.$onAuthStateChanged(function(firebaseUser, user) {
        $scope.firebaseUser = firebaseUser;
        //Witaj <nazwa email uzytkownika>
        $scope.user = firebase.auth().currentUser;
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

// Home Controller
app.controller("homeCtrl", ["$scope", "Auth", function($scope, Auth) {
  $scope.signOut = function() {
    Auth.$signOut().then(function() {
      location.reload();
      console.log("Pomyślnie wylogowano.");
    }).catch(function(error) {
      console.error(error);
    })

  }

}]);
