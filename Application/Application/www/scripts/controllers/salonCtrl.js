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

    $scope.activeHour = function(event) {
        $scope.hour = event.target.id;
    }

    $scope.saveBook = function() {
        $scope.date = ('0' + $scope.now.getDate()).slice(-2) + '-'
            + ('0' + ($scope.now.getMonth()+1)).slice(-2) + '-'
            + $scope.now.getFullYear() + 'T'
            + $scope.hour + ':00.000';

        var d = new Date();
        $scope.newDate = d.getTime();
        
        var reservation = $firebaseObject(ref.child('pl_salon').child($scope.activeSalon).child('reservation').child($scope.newDate));
        reservation.salon = $scope.salon.$id;
        reservation.service =  $scope.activeService
        reservation.user = $scope.firebaseUser.uid;
        reservation.date = $scope.date;
        reservation.$save();
        console.log('Selected date: '+$scope.date
            +'\nSelected salon: '+$scope.salon.$id
            +'\nSelected service: '+$scope.activeService
            +'\nUser UID: '+$scope.firebaseUser.uid);
    }
}])
