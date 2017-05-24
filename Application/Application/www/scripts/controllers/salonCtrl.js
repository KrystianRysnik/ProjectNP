// Salon Controller
app.controller("salonCtrl", ["$scope", "$location", "Auth", "$firebaseObject", function ($scope, $location, Auth, $firebaseObject) {
    var activeSalon = $location.search().activeSalon;

    var ref = firebase.database().ref();
    $scope.salon = $firebaseObject(ref.child('pl_salon').child(activeSalon));
}])