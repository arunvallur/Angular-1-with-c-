//app.config(['$routeProvider', function ($routeProvider) {
//    $routeProvider.
//    when('/Home', {
//        templateUrl: 'Template/Home.html'
//    }).
//    when('/BookingHistory', {
//        templateUrl: 'Template/BookingHistory.html'
//    }).
//    when('/test', {
//        //   templateUrl:'hello',
//        templateUrl: 'Template/test.html'
//    }).
//    otherwise({
//        templateUrl: 'Template/Home.html'
//    });

//}]);

//app.config(['$routeProvider', function ($routeProvider) {
//    $routeProvider.       
//    when('/Home', {
      
//        templateUrl: 'Template/Home.html'
//    }).
//    when('/BookingHistory', {
//        templateUrl: 'Template/BookingHistory.html'
//    }).
//    when('/Test', {
//        //   templateUrl:'hello',
//        templateUrl: 'Template/Test.html'
//    }).
//    when('/Login', {
//        templateUrl: 'Template/Login.html'
//    }).
//    otherwise({
//        template: 'Home'
//    });

//}])


app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    when('/Home', {
        templateUrl: '/Template/Home.html'
    }).
    when('/BookingHistory', {
        templateUrl: '/Template/BookingHistory.html'
    }).
    when('/Member', {

        templateUrl: '/Template/Member.html'
    }).
    when('/Price', {
        templateUrl: '/Template/Price.html'
    }).
        when('/Oneday', {
            templateUrl: '/Template/Oneday.html'
        }).
    otherwise({
        templateUrl: '/Template/Home.html'
    });

}]);