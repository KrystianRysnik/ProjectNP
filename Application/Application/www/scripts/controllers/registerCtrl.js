// Register Controller
app.controller("registerCtrl", ["$timeout", "$scope", "Auth", "Profile", function ($timeout, $scope, Auth, Profile) {
    var hide = function () {
        $scope.errorMessage = false;
    }

    $scope.register = function () {
        //Rejestracja
        Auth.$createUserWithEmailAndPassword($scope.email, $scope.pass)
        .then(function (user) {
            var profile = Profile(user.uid);
            profile.firstName = $scope.firstName;
            profile.lastName = $scope.lastName;
            profile.email = $scope.email;
            profile.$save();
            location.replace('#!/home');
            console.log("User created:", user.uid);
        }).catch(function (error) {
            //Możliwe błędy
            var errorCode = error.code;
            if (errorCode == 'auth/email-already-in-use') {
                $scope.errorMessage = 'BŁĄD! Email już wykorzystany.';
            } else if (errorCode == 'auth/invalid-email') {
                $scope.errorMessage = 'BŁĄD! Email nieprawidłowy.';
            } else if (errorCode == 'auth/weak-password') {
                $scope.errorMessage = 'BŁĄD! Hasło niewystarczająco silne.';
            } else {
                $scope.errorMessage = 'BŁĄD! Coś poszło nie tak.';
            }
            console.log(error);
            $timeout(hide, 3000);
        });
    };
}]);