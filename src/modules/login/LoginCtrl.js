app.controller('LoginCtrl',['$scope',function($scope){
  $scope.message="";
  $scope.show_message=false;
  $scope.loginAction=function(){
    var data=$scope.user;
    if(data.email==='demo@demo.com' && data.password==='demo'){
      localStorage.session_id = Date.now();
    }
    else{
      $scope.show_message=true;
      $scope.message='Sorry incorrect username or password please try again';
    }
  }
}]);
