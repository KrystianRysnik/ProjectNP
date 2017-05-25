// Salon Controller
app.controller("salonCtrl", ["$scope", "$location", "Auth", "$firebaseObject", function($scope, $location, Auth, $firebaseObject) {
    $scope.activeSalon = $location.search().activeSalon;

    var ref = firebase.database().ref();
    $scope.salon = $firebaseObject(ref.child('pl_salon').child($scope.activeSalon));

    $scope.booking = function(event) {
        $scope.activeService = event.target.id;
        $scope.showBook = 'true';
        $scope.now = new Date();
    }

    $scope.prevDay = function() {
        $scope.now = new Date(($scope.now.getTime()-(1*24*60*60*1000)))
    }

    $scope.nextDay = function() {
        $scope.now = new Date(($scope.now.getTime()+(1*24*60*60*1000)))
    }
}])
