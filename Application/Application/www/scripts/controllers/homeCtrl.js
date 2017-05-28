// Home Controller
app.controller("homeCtrl", ["$scope", "Auth", "$firebaseObject", function ($scope, Auth, $firebaseObject) {
    var ref = firebase.database().ref();
    $scope.salons = $firebaseObject(ref.child('pl_salon'));
}]);
