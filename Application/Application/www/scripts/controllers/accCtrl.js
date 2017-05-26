// Account Controller
app.controller("accountCtrl", ["$scope", "Auth", function ($scope, Auth) {
    
$scope.usun = function(){
   var odp = confirm("Czy na pewno chcesz usunąć użytkownika ?");
    if(odp == true){
        
               Auth.$deleteUser().then(function() {
                   console.log('Deleted');
                   location.reload();
      }).catch(function(error) {
                   console.log("Error");
      });
                   
    }
    else{
        alert("Dobrze, że z nami pozostajesz");
    }
};
    
}]);