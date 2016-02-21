app.controller('UserCtrl',['$scope','dataService',function($scope,dataService){
	$scope.users = [];
	$scope.done=false;
	dataService.getData().then(function(data){
		$scope.users=data.data;
		$scope.done=true;
	})
}]);