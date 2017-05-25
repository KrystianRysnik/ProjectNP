// Salon Controller
app.controller("salonCtrl", ["$scope", "$location", "Auth", "$firebaseObject", function($scope, $location, Auth, $firebaseObject) {
    $scope.activeSalon = $location.search().activeSalon;

    var ref = firebase.database().ref();
    $scope.salon = $firebaseObject(ref.child('pl_salon').child($scope.activeSalon));

    $scope.booking = function(event) {
        $scope.activeService = event.target.id;
        $scope.showBook = 'true';
    }
}])
