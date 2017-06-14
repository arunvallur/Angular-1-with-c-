/// <reference path="../Scripts/angular.min.js" />
/// <reference path="AppCall.js" />
/// <reference path="../Scripts/angular-route.min.js" />

var app = angular.module("AngluarApp", ['ngTable', 'ngRoute', 'ui.bootstrap', 'cgPrompt', 'ngAnimate', 'ngSanitize', 'ngDialog', 'ngMessages']);


app.directive("sort", function () {
    return {
        restrict: 'A',
        transclude: true,
        template:
          '<a ng-click="onClick()">' +
            '<span ng-transclude></span>' +
            '<i class="glyphicon" ng-class="{\'glyphicon-sort-by-alphabet\' : order === by && !reverse,  \'glyphicon-sort-by-alphabet-alt\' : order===by && reverse}"></i>' +
          '</a>',
        scope: {
            order: '=',
            by: '=',
            reverse: '='
        },
        link: function (scope, element, attrs) {
            scope.onClick = function () {
                if (scope.order === scope.by) {
                    scope.reverse = !scope.reverse
                } else {
                    scope.by = scope.order;
                    scope.reverse = false;
                }
            }
        }
    }
});


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
             
                test = data;
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


app.controller("Home", function ($scope,$rootScope,$modal, $sce, $http,$timeout, $location, ApiCallService) {

   
  

    var LoadUserDetails = function () {
        var data1 = {};


        var result = ApiCallService.GetApiCall("Admin", "GetUseDetails").then(function (Result) {

            data1 = angular.fromJson(Result.data);
          
            if (data1 !== null) {

                 $scope.Usedeatails = data1;
            }
            else {

                window.location.href = '/EBC/Login';
            }
           

        })

    };


    function LoadTable1(data) {
        $scope['tableParams'] = { reload: function () { }, settings: function () { return {} } };
        $timeout(LoadUserDetails(), 100)
    };
    LoadTable1();










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


    $scope.Save = function () {

        tinymce.init({
            selector: 'textarea',  // change this value according to your HRML
            plugins: "preview",
            visual: false,
            toolbar: "preview",
            theme_advanced_buttons3_add: "preview",
            plugin_preview_width: "500",
            plugin_preview_height: "600"
        });

     //   var data = tinyMCE.activeEditor.getContent();
        
  

        var data ={};

     

        for (i = 0; i < tinyMCE.editors.length; i++) {

            if (i === 0) {
                data.News = tinyMCE.editors[i].getContent();
            }
            else if(i===1) {
                data.Updates = tinyMCE.editors[i].getContent();
            }
            else {
                data.Tournaments = tinyMCE.editors[i].getContent();
            }

        }


           var result = ApiCallService.PostApiCall("Admin", "SaveUpdates", data).then(function (Result) {

               data = angular.fromJson(Result.data);

               if (data !== null && Result.status === 200) {

                   $scope.tinymceModel = data;

                   var modalInstance = $modal.open({
                       templateUrl: '/Template/Saved.html',
                       controller: 'modelclose',
                       resolve: {
                           data: function () {
                               return data;
                           }
                       }
                       
                   });
               }
               else {

                   var modalInstance = $modal.open({
                       templateUrl: '/Template/Error.html',
                       controller: 'modelclose',
                       resolve: {
                           data: function () {
                               return data
                           }

                       }
                   });

               }


            //data = $.parseJSON(JSON.parse(Result.data));
        
          
        })


    };
  

    var LoadHistory = function () {
        var data = {};


        var result = ApiCallService.GetApiCall("Admin", "GetUpdates").then(function (Result) {

            data = angular.fromJson(Result.data);
            //data = $.parseJSON(JSON.parse(Result.data));
            $scope.tinymceModel = data;

        })

    };


    function LoadTable(data) {
        $scope['tableParams'] = { reload: function () { }, settings: function () { return {} } };
        $timeout(LoadHistory(), 100)
    };
    LoadTable();







 



});



app.controller("History", function ($scope, $filter, $http, $timeout, $modal, ngTableParams, $location, ApiCallService, $rootScope, dateFilter) {


    $scope.options = [{ name: "Guest User", id: 4 },{ name: "Registered User", id: 3 }, { name: "Member", id: 1 }];
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
                sortInfo: { fields: [], columns: [], directions: [] },
                sorting: {
                    Name: 'asc'     // initial sorting
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
 
    $scope.saveprice = false;

    var LoadPrice = function () {
        var data = {};


        var result = ApiCallService.GetApiCall("Admin", "Price").then(function (Result) {

            data = angular.fromJson(Result.data);
            //data = $.parseJSON(JSON.parse(Result.data));
            $scope.data = data;

            $scope['tableParams'] = new ngTableParams({
              //  page: 1,            // by default it show first page
              //  count: 10,          // count per page
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

        $scope.saveprice = true;

        //$scope.scrollTo('ScrollToTopOnEdit');
    }

    $scope.clear = function () {
        $scope.Price = {};
        
    };
   
    $scope.AddPrice = function(prices){

        var priceId = angular.isUndefined(prices.ID);

        if (priceId===true) {
            var data = {};

            $scope.saveprice = false;
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

                      //  params.total(orderedData.length); // set total for recalc pagination
                        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                });




            })



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

        $scope.saveprice = false;
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


app.controller('modelclose', function ($scope, $location, $timeout, $modalInstance, ApiCallService,data) {


    $scope.Ok = function () {
        $modalInstance.dismiss();
    }

});

app.controller('OperatorCreate', function ($scope, $location,ngTableParams,$filter, $timeout, ApiCallService) {

    $scope.roles = [{ name: "Operator", Role: 2 }];
    var LoadOperator = function () {
        var data = {};


        var result = ApiCallService.GetApiCall("Admin", "GetOperator").then(function (Result) {

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
        $timeout(LoadOperator(), 100)
    };
    LoadTable();
    
    $scope.SaveOperator = function (users) {


        var operatorid = angular.isUndefined(users.id);

        users.role_id = users.Role.Role;
        delete users.Role;

            if (operatorid === true) {
            $scope['tableParams'] = {};
            result = ApiCallService.PostApiCall("Admin", "CreateOpo", users).then(function (Result) {

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

            $scope.users = {};
        }
            else {
            $scope['tableParams'] = {};
            result = ApiCallService.PostApiCall("Admin", "Editedoprator", users).then(function (Result) {

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
            $scope.users = {};
        }


         

}
     

    $scope.clear = function () {
        $scope.users = {};

    };

    $scope.EditOperator = function (Operator) {
        $scope.users = {};
        $scope.users.id = Operator.id;
        $scope.users.first_name = Operator.first_name;
        $scope.users.last_name = Operator.last_name;
        $scope.users.email_id = Operator.email_id;
        $scope.users.phone_no = Operator.phone_no;
        $scope.users.Role = Operator.Role;
        $scope.users.password = Operator.password;
        $scope.users.status = Operator.status;

        var dropdata = $scope.roles
        for (var obj = 0; obj < dropdata.length; obj++) {
            if (dropdata[obj].Role == Operator.role_id) {
                $scope.users.Role = dropdata[obj];
                break;
            }
        };
        //$scope.scrollTo('ScrollToTopOnEdit');
    }
   
})