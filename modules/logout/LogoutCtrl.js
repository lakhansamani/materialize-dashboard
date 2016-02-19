app.controller('LogoutCtrl',['$scope','$state',function($scope,$state){
    window.localStorage.removeItem("session_id");
    $state.go('login');
}]);