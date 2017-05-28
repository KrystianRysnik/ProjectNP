// Auth Controller
app.controller("AuthCtrl", ["$scope", "Auth", function ($scope, Auth) {
    $scope.auth = Auth;
    $scope.auth.$onAuthStateChanged(function (firebaseUser) {
        // Wyswietlenie informacji o uzytkowniku np. {{ firebaseUser.email }}
        $scope.firebaseUser = firebaseUser;
    });

    $scope.signOut = function () {
        Auth.$signOut().then(function () {
            location.reload();
            console.log("Pomyślnie wylogowano.");
        }).catch(function (error) {
            console.error(error);
        })
    }
}]);
