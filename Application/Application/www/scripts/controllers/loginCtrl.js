// Login Controller
app.controller("loginCtrl", ["$timeout", "$scope", "Auth", function ($timeout, $scope, Auth) {
    var hide = function () {
        $scope.errorMessage = false;
    }

    $scope.login = function () {
        //Logowanie
        Auth.$signInWithEmailAndPassword($scope.email, $scope.pass)
        .then(function (user) {
            location.replace('#!/home');
            console.log("Signed in as:", user.uid);
        }).catch(function (error) {
            //Możliwe błędy
            var errorCode = error.code;
            if (errorCode == 'auth/invalid-email') {
                $scope.errorMessage = 'BŁĄD! Email nieprawidłowy.';
            } else if (errorCode == 'auth/user-not-found') {
                $scope.errorMessage = 'BŁĄD! Nie znaleziono takiego użytkownika.';
            } else if (errorCode == 'auth/wrong-password') {
                $scope.errorMessage = 'BŁĄD! Hasło nieprawidłowe.'
            } else {
                $scope.errorMessage = 'BŁĄD! Coś poszło nie tak.';
            }
            console.log(error);
            $timeout(hide, 3000);
        });
    };
}]);