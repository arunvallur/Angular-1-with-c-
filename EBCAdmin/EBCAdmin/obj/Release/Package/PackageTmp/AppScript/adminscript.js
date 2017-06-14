/// <reference path="../Scripts/angular.min.js" />
/// <reference path="AppCall.js" />
/// <reference path="../Scripts/angular-route.min.js" />

var app = angular.module("AngluarApp", ['ngTable', 'ngRoute', 'ui.bootstrap', 'cgPrompt', 'ngAnimate', 'ngSanitize', 'ngDialog', 'ngMessages']);


app.filter('secondsToDateTime', [function () {
    return function (seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
    };
}]);
app.filter("dateFilter", function () {
    return function (item) {
        if (item !== null) {
            return new Date(parseInt(item.substr(6)));
        }
        return "";
    };
});

app.controller("UserLogin", function ($scope,$rootScope, $http, $timeout, ApiCallService) {

    var divMessageEle = angular.element('#divMessage');
    var inlineEle = angular.element('#inlineMessage');
    
    $scope.LoginUser = function (user) {
       
        var result = ApiCallService.PostApiCall("Admin", "Login",user).then(function (result) {
           
          var status = result.status;
            var data = angular.fromJson(result.data);
         
            if (data!==null && status===200) {
             
            
                window.location.href = '/EBC/Home';
               
            }
            else {
                divMessageEle[0].className = "alert alert-danger";
                inlineEle[0].className = "fa fa-close";
                $scope.message = 401 + " : UnAuthorized user.Please Retry Again";
                $timeout(clear, 5000);
               // $scope.message ="Login User Name or Password is wrong "
            } 
        });

    };
});


app.controller("Home", function ($scope,$rootScope, $sce, $http, $location, ApiCallService) {

    
  

    $scope.tinymceOptions = {
        theme: "modern",
        plugins: [
            "advlist autolink lists link image charmap print preview hr anchor pagebreak",
            "searchreplace wordcount visualblocks visualchars code fullscreen",
            "insertdatetime media nonbreaking save table contextmenu directionality",
            "emoticons template paste textcolor"
        ],
        toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
        toolbar2: "print preview media | forecolor backcolor emoticons",
        image_advtab: true,
        height: "200px",
        width: "650px"
    };


    $scope.Save = function (Text) {

        tinymce.init({
            selector: 'textarea',  // change this value according to your HRML
            plugins: "preview",
            visual: false,
            toolbar: "preview",
            theme_advanced_buttons3_add: "preview",
            plugin_preview_width: "500",
            plugin_preview_height: "600"
        });

        var data = tinyMCE.activeEditor.getContent();

    };
  


});



app.controller("History", function ($scope, $filter, $http, $timeout, $modal, ngTableParams, $location, ApiCallService, $rootScope, dateFilter) {


    $scope.options = [{ name: "One Day Booked", id: 1 }, { name: "3 Months Booked", id: 2 }, { name: "6 Months Booked", id: 3 }];
    //$scope.selectedOption = $scope.options[1];

    $scope.Getusertype = function (usertypes) {

      //  var tesint = 'hi';
        //  var id = typeid.id;
        $scope['tableParams'] = {};
        var result = ApiCallService.PostApiCall("Admin", "HistorybyType", usertypes).then(function (Result) {

            data = angular.fromJson(Result.data);
            //data = $.parseJSON(JSON.parse(Result.data));
            $scope.data = data;
          
         
           
           
            $scope['tableParams'] = new ngTableParams({
                page: 1,            // by default it show first page
                count: 10,          // count per page
                sorting: {
                    name: 'asc'     // initial sorting
                }
            }, {
                total: data.length, // length of data
                getData: function ($defer, params) {
                    // use build-in angular filter
                    var filteredData = params.filter() ?
                            $filter('filter')(data, params.filter()) :
                            data;

                    var orderedData = params.sorting() ?
                            $filter('orderBy')(filteredData, params.orderBy()) :
                            data;

                    params.total(orderedData.length); // set total for recalc pagination
                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });




        })

      
    };

  

    var LoadHistory=   function() {
        var data = {};


        var result =ApiCallService.GetApiCall("Admin", "History").then(function (Result) {

            data = angular.fromJson(Result.data);
            //data = $.parseJSON(JSON.parse(Result.data));
           $scope.data = data;
          
            $scope['tableParams'] = new ngTableParams({
                page: 1,            // by default it show first page
                count: 10,          // count per page
                sorting: {
                    name: 'asc'     // initial sorting
                }
            }, {
                total: data.length, // length of data
                getData: function ($defer, params) {
                    // use build-in angular filter
                    var filteredData = params.filter() ?
                            $filter('filter')(data, params.filter()) :
                            data;
                    
                    var orderedData = params.sorting() ?
                            $filter('orderBy')(filteredData, params.orderBy()) :
                            data;

                    params.total(orderedData.length); // set total for recalc pagination
                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });




        })

    };


    function LoadTable(data) {
        $scope['tableParams'] = { reload: function () { }, settings: function () { return {} } };
        $timeout(LoadHistory(), 100)
    };
    LoadTable();

    $scope.Cancel = function (Bookingdetails) {

    //    ApiCallService.openPopupModaltocancel(Bookingdetails);

        var modalInstance = $modal.open({
            templateUrl: '/Template/CancelBooking.html',
            controller: 'CancelBooking',
            resolve: {
                Bookingdetails: function () {
                    return Bookingdetails;
                }
               
            }
        });


        modalInstance.result.then(function () {
  
            var LoadHistory = function () {
                var data = {};


                var result = ApiCallService.GetApiCall("Admin", "History").then(function (Result) {

                    data = angular.fromJson(Result.data);
                    //data = $.parseJSON(JSON.parse(Result.data));
                    $scope.data = data;

                    $scope['tableParams'] = new ngTableParams({
                        page: 1,            // by default it show first page
                        count: 10,          // count per page
                        sorting: {
                            name: 'asc'     // initial sorting
                        }
                    }, {
                        total: data.length, // length of data
                        getData: function ($defer, params) {
                            // use build-in angular filter
                            var filteredData = params.filter() ?
                                    $filter('filter')(data, params.filter()) :
                                    data;

                            var orderedData = params.sorting() ?
                                    $filter('orderBy')(filteredData, params.orderBy()) :
                                    data;

                            params.total(orderedData.length); // set total for recalc pagination
                            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                        }
                    });




                })

            };


            function LoadTable(data) {
                $scope['tableParams'] = { reload: function () { }, settings: function () { return {} } };
                $timeout(LoadHistory(), 100)
            };
            LoadTable();
            
        })

     

    }

  //  LoadHistory();
});

app.controller("members", function ($scope, $filter, $http, $timeout,$modal,ngTableParams, $location, ApiCallService, $rootScope, dateFilter, $modal) {
    $scope.options = [{ name: "One Day Member", id: 1 }, { name: "3 Month Member", id: 2 }, { name: "6 Month Member", id: 3 }];
    var LoadMembers = function () {
        var data = {};


        var result = ApiCallService.GetApiCall("Admin", "Members").then(function (Result) {

            data = angular.fromJson(Result.data);
            //data = $.parseJSON(JSON.parse(Result.data));
            $scope.data = data;

            $scope['tableParams'] = new ngTableParams({
                page: 1,            // by default it show first page
                count: 10,          // count per page
                sorting: {
                    name: 'asc'     // initial sorting
                }
            }, {
                total: data.length, // length of data
                getData: function ($defer, params) {
                    // use build-in angular filter
                    var filteredData = params.filter() ?
                            $filter('filter')(data, params.filter()) :
                            data;

                    var orderedData = params.sorting() ?
                            $filter('orderBy')(filteredData, params.orderBy()) :
                            data;

                    params.total(orderedData.length); // set total for recalc pagination
                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });




        })

    };
    function LoadTable(data) {
        $scope['tableParams'] = { reload: function () { }, settings: function () { return {} } };
        $timeout(LoadMembers(), 100)
    };
    LoadTable();

    $scope.GetMembertype = function (type) {

        $scope['tableParams'] = {};
        var result = ApiCallService.PostApiCall("Admin", "Memberstype",type).then(function (Result) {

            data = angular.fromJson(Result.data);
            //data = $.parseJSON(JSON.parse(Result.data));
            $scope.data = data;

            $scope['tableParams'] = new ngTableParams({
                page: 1,            // by default it show first page
                count: 10,          // count per page
                sorting: {
                    name: 'asc'     // initial sorting
                }
            }, {
                total: data.length, // length of data
                getData: function ($defer, params) {
                    // use build-in angular filter
                    var filteredData = params.filter() ?
                            $filter('filter')(data, params.filter()) :
                            data;

                    var orderedData = params.sorting() ?
                            $filter('orderBy')(filteredData, params.orderBy()) :
                            data;

                    params.total(orderedData.length); // set total for recalc pagination
                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });




        })

    }

    $scope.Details = function (Details) {

   //     var data = "testing";

        var modalInstance = $modal.open({
            templateUrl: '/Template/Details.html',
            controller: 'MemberDetails',
            resolve: {
                Details: function () {
                    return Details;
                }

            }
        });

        modalInstance.result.then(function(){


            var LoadMembers = function () {
        var data = {};


        var result = ApiCallService.GetApiCall("Admin", "Members").then(function (Result) {

            data = angular.fromJson(Result.data);
            //data = $.parseJSON(JSON.parse(Result.data));
            $scope.data = data;

            $scope['tableParams'] = new ngTableParams({
                page: 1,            // by default it show first page
                count: 10,          // count per page
                sorting: {
                    name: 'asc'     // initial sorting
                }
            }, {
                total: data.length, // length of data
                getData: function ($defer, params) {
                    // use build-in angular filter
                    var filteredData = params.filter() ?
                            $filter('filter')(data, params.filter()) :
                            data;

                    var orderedData = params.sorting() ?
                            $filter('orderBy')(filteredData, params.orderBy()) :
                            data;

                    params.total(orderedData.length); // set total for recalc pagination
                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });




        })

    };
            function LoadTable(data) {
                $scope['tableParams'] = { reload: function () { }, settings: function () { return {} } };
                $timeout(LoadMembers(), 100)
            };
            LoadTable();



        })

    };


})


app.controller("Price", function ($scope, $filter, $http, $timeout, ngTableParams, $location, ApiCallService, $rootScope, dateFilter) {
 
    var LoadPrice = function () {
        var data = {};


        var result = ApiCallService.GetApiCall("Admin", "Price").then(function (Result) {

            data = angular.fromJson(Result.data);
            //data = $.parseJSON(JSON.parse(Result.data));
            $scope.data = data;

            $scope['tableParams'] = new ngTableParams({
                page: 1,            // by default it show first page
                count: 10,          // count per page
                sorting: {
                    name: 'asc'     // initial sorting
                }
            }, {
                total: data.length, // length of data
                getData: function ($defer, params) {
                    // use build-in angular filter
                    var filteredData = params.filter() ?
                            $filter('filter')(data, params.filter()) :
                            data;

                    var orderedData = params.sorting() ?
                            $filter('orderBy')(filteredData, params.orderBy()) :
                            data;

                    params.total(orderedData.length); // set total for recalc pagination
                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });




        })

    };
    function LoadTable(data) {
        $scope['tableParams'] = { reload: function () { }, settings: function () { return {} } };
        $timeout(LoadPrice(), 100)
    };
    LoadTable();


    $scope.EditPrice = function (Price) {
        $scope.Price = {};
        $scope.Price.ID = Price.ID;
        $scope.Price.singlem = Price.singlem;
        $scope.Price.mem3m = Price.mem3m;
        $scope.Price.mem6m = Price.mem6m;
        $scope.Price.adultcoaching = Price.adultcoaching;
        $scope.Price.childcoaching = Price.childcoaching;
        $scope.Price.tax = Price.tax;

        //$scope.scrollTo('ScrollToTopOnEdit');
    }

    $scope.clear = function () {
        $scope.Price = {};
        
    };
   
    $scope.AddPrice = function(prices){

        var priceId = angular.isUndefined(prices.ID);

        if (priceId===true) {
            $scope['tableParams'] = {};
            result = ApiCallService.PostApiCall("Admin", "SavePrice", prices).then(function (Result) {

                data = angular.fromJson(Result.data);
                //data = $.parseJSON(JSON.parse(Result.data));
                $scope.data = data;

                $scope['tableParams'] = new ngTableParams({
                    page: 1,            // by default it show first page
                    count: 10,          // count per page
                    sorting: {
                        name: 'asc'     // initial sorting
                    }
                }, {
                    total: data.length, // length of data
                    getData: function ($defer, params) {
                        // use build-in angular filter
                        var filteredData = params.filter() ?
                                $filter('filter')(data, params.filter()) :
                                data;

                        var orderedData = params.sorting() ?
                                $filter('orderBy')(filteredData, params.orderBy()) :
                                data;

                        params.total(orderedData.length); // set total for recalc pagination
                        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                });

            });

            $scope.Price = {};
        }
        else {
            $scope['tableParams'] = {};
            result = ApiCallService.PostApiCall("Admin", "EditedPrices",prices ).then(function (Result) {

                data = angular.fromJson(Result.data);
                //data = $.parseJSON(JSON.parse(Result.data));
                $scope.data = data;

                $scope['tableParams'] = new ngTableParams({
                    page: 1,            // by default it show first page
                    count: 10,          // count per page
                    sorting: {
                        name: 'asc'     // initial sorting
                    }
                }, {
                    total: data.length, // length of data
                    getData: function ($defer, params) {
                        // use build-in angular filter
                        var filteredData = params.filter() ?
                                $filter('filter')(data, params.filter()) :
                                data;

                        var orderedData = params.sorting() ?
                                $filter('orderBy')(filteredData, params.orderBy()) :
                                data;

                        params.total(orderedData.length); // set total for recalc pagination
                        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                });

            })
            $scope.Price = {};
        }


    };

})




app.controller("onedaymembers", function ($scope, $filter, $http, $timeout, ngTableParams, $location, ApiCallService, $rootScope, dateFilter) {

  
    var LoadOneDayMembers = function () {
        var data = {};


        var result = ApiCallService.GetApiCall("Admin", "OneDayMembers").then(function (Result) {

            data = angular.fromJson(Result.data);
            //data = $.parseJSON(JSON.parse(Result.data));
            $scope.data = data;

            $scope['tableParams'] = new ngTableParams({
                page: 1,            // by default it show first page
                count: 10,          // count per page
                sorting: {
                    name: 'asc'     // initial sorting
                }
            }, {
                total: data.length, // length of data
                getData: function ($defer, params) {
                    // use build-in angular filter
                    var filteredData = params.filter() ?
                            $filter('filter')(data, params.filter()) :
                            data;

                    var orderedData = params.sorting() ?
                            $filter('orderBy')(filteredData, params.orderBy()) :
                            data;

                    params.total(orderedData.length); // set total for recalc pagination
                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });




        })

    };
    function LoadTable(data) {
        $scope['tableParams'] = { reload: function () { }, settings: function () { return {} } };
        $timeout(LoadOneDayMembers(), 100)
    };
    LoadTable();

  


})



app.controller('ModalInstanceCtrl', function ($scope, $filter, $http, $timeout, ngTableParams, $location, ApiCallService, $rootScope, dateFilter) {
   // $scope.customer = customer;

});

app.controller('CancelBooking', function ($scope,$location,$timeout, $modalInstance,ApiCallService, Bookingdetails) {


    $scope.Details = Bookingdetails;

  

    $scope.ok = function () {

        var data = $scope.Details;
        var result = ApiCallService.PostApiCall("Admin", "Cancelbooking", data).then(function (result) {
         
            $modalInstance.close();

         //   windows.location('#Member')
        })

       

    }

    $scope.cancel = function () {
        $modalInstance.dismiss();
    }

});


app.controller('MemberDetails', function ($scope, $location, $timeout, $modalInstance, ApiCallService, Details) {


    var result = ApiCallService.PostApiCall("Admin", "Details", Details).then(function (Result) {

        $scope.Details = angular.fromJson(Result.data);

    })


    $scope.Save = function (Details) {


        $scope.Details = Details;
        var result = ApiCallService.PostApiCall("Admin", "UpdateDetails", Details).then(function (Result) {

            $scope.Details = angular.fromJson(Result.data);

            $modalInstance.close();

        })


    }


    $scope.Cancel = function () {
        $modalInstance.dismiss();
    }
    

});
