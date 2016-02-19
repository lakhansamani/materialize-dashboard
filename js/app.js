var app=angular.module('myApp', ['myApp.controllers','ui.router','chart.js'],['$provide', function($provide) {
    //Function for clearing template cache
    var cacheBuster = Date.now().toString();

    function templateFactoryDecorator($delegate) {
        var fromUrl = angular.bind($delegate, $delegate.fromUrl);
        $delegate.fromUrl = function (url, params) {
            if (url !== null && angular.isDefined(url) && angular.isString(url)) {
                url += (url.indexOf("?") === -1 ? "?" : "&");
                url += "v=" + cacheBuster;
            }
            return fromUrl(url, params);
        };

        return $delegate;
    }
     $provide.decorator('$templateFactory', ['$delegate', templateFactoryDecorator]);
}]);
app.config(function($stateProvider,$urlRouterProvider){
	$stateProvider
	.state('login', {
		url: '/login',
		templateUrl:'modules/login/login.html',
		controller:'LoginCtrl',
		data : {requireLogin : false }
	})
	.state('main',{
		views: {
			'@' : {templateUrl: 'modules/wrapper/layout.html'},
			'top@main' : { templateUrl: 'modules/wrapper/menu.html',},
			'left@main' : { templateUrl: 'modules/wrapper/side_menu.html',},
			'content@main' : { templateUrl: 'modules/wrapper/wrap.html',},
		},
	})
	.state('main.dashboard',{
		url:'/dashboard',
		views:{
			'mainSection@main':{
				templateUrl:'modules/dashboard/dashboard.html',
				controller:'DashboardCtrl'
			}
		},
		data:{requireLogin:true}
	})
	.state('logout',{
		url:'/logout',
		controller:'LogoutCtrl',
		data:{requireLogin:true}
	})
  $urlRouterProvider.otherwise('/login');
});

//Check authentication
app.run(function($rootScope, $state, $location,$stateParams){
	$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
		var session=localStorage.session_id;
		if(session){
			if(toState.data.requireLogin){
				event.preventDefault();
				$state.go(toState.name, null, {notify: false}).then(function (state) {
					$rootScope.$broadcast('$stateChangeSuccess', state, null);
				});
			}
			else{
				event.preventDefault();
				$state.go('main.dashboard', null, {notify: false}).then(function (state) {
					$rootScope.$broadcast('$stateChangeSuccess', state, null);
				});
			}

		}
		else{
			if(toState.data.requireLogin){
				event.preventDefault();
				$state.go('login', null, {notify: false}).then(function (state) {
					$rootScope.$broadcast('$stateChangeSuccess', state, null);
				});
			}

		}
	});
});
angular.module('myApp.controllers',[]);
