app.service('dataService',['$q','$http',function($q,$http){
	return {
			getData: function getData(){
				return $http.get('modules/users/data.json').then(function(data){
					console.log(data)
					return data;
				})
		}
	};
}]);