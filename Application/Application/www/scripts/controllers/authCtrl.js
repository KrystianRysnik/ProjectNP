// Auth Controller
app.controller("AuthCtrl", ["$scope", "Auth", "Profile", function ($scope, Auth, Profile) {
    $scope.auth = Auth;
    $scope.auth.$onAuthStateChanged(function (firebaseUser) {
        // Wyswietlenie informacji o uzytkowniku np. {{ firebaseUser.email }}
        $scope.firebaseUser = firebaseUser;
        $scope.profile = Profile($scope.firebaseUser.uid);
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