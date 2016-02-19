app.controller('LoginCtrl',['$scope','$state',function($scope,$state){
  $scope.message="";
  $scope.show_message=false;
  $scope.loginAction=function(){
    var data=$scope.user;
    if(data.email==='demo@demo.com' && data.password==='demo'){
      localStorage.session_id = Date.now();
      $state.go('main.dashboard');
    }
    else{
      $scope.show_message=true;
      $scope.message='Sorry incorrect username or password please try again';
    }
  }
}]);
