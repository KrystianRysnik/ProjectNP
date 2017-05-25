// Salon Controller
app.controller("salonCtrl", ["$scope", "$location", "Auth", "$firebaseObject", function($scope, $location, Auth, $firebaseObject) {
    $scope.activeSalon = $location.search().activeSalon;

    var ref = firebase.database().ref();
    $scope.salon = $firebaseObject(ref.child('pl_salon').child($scope.activeSalon));

    $scope.booking = function(event) {
        $scope.activeService = event.target.id;
        $scope.showBook = 'true';
        $scope.now = new Date();
        $scope.start = $scope.salon.hourStart;
        $scope.stop = $scope.salon.hourEnd;

        $scope.getTimeArray = function(start, stop, interval){
            var result = [];
            if(interval == '0')
                return result;

            function toMinutes(time){
                var pair = time.split(':');
                return pair[0] * 60 + 1 * pair[1];
            }

            function toString(minutes){
                var hours = Math.floor(minutes / 60);
                var min = (minutes - hours * 60);
                min = min > 9 ? min : '0' + min;
                return hours + ':' + min;
            }

            for(var i = toMinutes(start); i <= toMinutes(stop); i += 1 * interval)
                result.push(toString(i))

            return result;
        }
    }

    $scope.prevDay = function() {
        $scope.now = new Date(($scope.now.getTime()-(1*24*60*60*1000)))
    }

    $scope.nextDay = function() {
        $scope.now = new Date(($scope.now.getTime()+(1*24*60*60*1000)))
    }
}])
