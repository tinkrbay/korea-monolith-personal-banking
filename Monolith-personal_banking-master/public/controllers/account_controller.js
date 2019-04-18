var app = angular.module('Personal-Banking',['chart.js','ngCookies','ngRoute']);

app.controller('AccountController',['$scope','$http','$location','$cookies','LoginService',function($scope,$http,$location,$cookies, LoginService){

$scope.accounts = '';
$scope.acc_names='';
$scope.acc_bal='';

$scope.accountid_selected="";


$scope.accounts_details="";

$scope.username="";
$scope.password="";
$scope.isError="";
$scope.login_href="";
$scope.showNoTransaction="";
$scope.showTransaction="";
$scope.newuser= {
};


$scope.init_accounts = function() { 
	 $http.get('http://34.233.71.117:3000/accounts/?emailAddress='+$cookies.get('email')).success(function(response) {
	 	var json = [];
	 	var names = [];
	 	var bal =[];
        angular.forEach(response, function(value, key){
                json.push(value);
                names.push(value.accountid);
                bal.push(value.balance);
            });
        $scope.accounts = json;
        $scope.acc_names= names;
        $scope.acc_bal = bal;
    });
}


$scope.init_accounts_details = function() { 
     $http.get('http://3.92.87.131:3000/details/?emailAddress='+$cookies.get('email')+"&bankName="+$location.search().accountid).success(function(response) {
        var json = [];
        angular.forEach(response, function(value, key){
                json.push(value);
            });
        if(json.length==0){
$scope.showNoTransaction=true
        } else {
$scope.showTransaction = true
        }
        $scope.accounts_details = json;
        $scope.accountid__selected = $location.search().accountid;
    });
}


$scope.login = function() {
    LoginService.Login($scope.username,$scope.password);
    $scope.isError = LoginService.isErrorValue;
}


$scope.register = function() {
$http({
          method  : 'POST',
          url     : 'http://35.171.193.74:3000/users',
          data    : $scope.newuser 
         })
 .success(function(response) {
$cookies.put("email",$scope.newuser.emailAddress)
$location.path('/welcome')
})
}

$scope.register_user = function() {
$location.path("/register")
}

$scope.sign_out = function() {
$cookies.remove('email');
}


$scope.home_link = function() {
    console.log($cookies.get('email'))
    if($cookies.get('email')==null){
$location.path("/")
    }
    else {
$location.path("/welcome")
}
}

}]);

app.factory('LoginService',
    ['$http', '$cookies', '$rootScope','$location',
    function ($http, $cookies, $rootScope,$location) {
        var service = {};

        service.Login = function (username, password) {

$http.get('http://35.171.193.74:3000/users/?userId='+username).success(function(response) {
if(response != null && angular.fromJson(response).password==password){
    $cookies.put("email",username)
    $location.path("/welcome")
}
else {
    $rootScope.isError=true 
}
})
        };

        service.isErrorValue = function() {
            return $rootScope.isError;
        }

 
        return service;
    }])



app.config(function($routeProvider) {
        $routeProvider
            .when('/welcome', {
                templateUrl : 'welcome.html',
                controller : 'AccountController'
            })
            .when('/register', {
                templateUrl : 'register.html',
                controller : 'AccountController'
            })
             .when('/details', {
                templateUrl : 'details.html',
                controller : 'AccountController'
            })
             .otherwise({
                templateUrl : 'login.html',
                controller : 'AccountController'
            });

    });
