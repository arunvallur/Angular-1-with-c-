/// <reference path="adminscript.js" />

//app.service('Api', ['$http', function ($http) {
//    var result;
   
//    this.GetapiCall = function (controller, action) {
//        result = $http.get('api/' + controller + '/' + action).success(function (response) {
//            result = (response);
//        });
//        return result;
//    };

//    this.PostapiCall = function (controller, action, obj) {
//        alert('call to web api..');
//        result = $http.post('api/' + controller + '/' + action, obj).success(function (response) {
//            alert("result of web api..");
//            console.log("testing...")
//            result = (response);
//        });
//        return result;
//    };





//    //this.PostapiCall = function (controller, action, obj) {
//    //    alert('call to web api..');
//    //    result = $http.post('api/' + controller + '/' + action, obj).then(function (response) {
//    //        $scope.status = response.status;
//    //        $scope.data = response.data;
//    //    }, function (response) {
//    //        $scope.data = response.data || "Request failed";
//    //        $scope.status = response.status;
//    //    });
//    //};
   

//}]);


app.service('ApiCallService', ['$http','$modal', function ($http, $modal) {
    var ServiceResult;
    // Parameter to pas:
    //Controller-- Web Api Controller Name
    //Method-- Web Api Method Name
    //obj-- This is parameter passed from UI to Backend Web Api controller 
    this.PostApiCall = function (Controller, Method, obj) {
        ServiceResult = $http.post('api/' + Controller + '/' + Method, obj).success(function (data, status) {
         
            ServiceResult = (data, status);
        });
        return ServiceResult;
    };
    //var data;
    //this.GlobalVariables = function (obj) {
    //    data = obj;

    //};

    this.GetApiCall = function (Controller, Method, obj) {
        ServiceResult = $http.get('api/' + Controller + '/' + Method, obj).success(function (data,status) {

            ServiceResult = (data, status);
        });
        return ServiceResult;
    };

    this.openPopupModal = function () {
        var modalInstance = $modal.open({
            templateUrl: '/Template/TimeSlot.html',
            controller: 'ModalInstanceCtrl'
        });
    }

    this.openPopupModaltocancel = function (Bookingdetails) {
        var modalInstance = $modal.open({
            templateUrl: '/Template/CancelBooking.html',
            controller: 'CancelBooking',
            resolve: {
                Bookingdetails: function () {
                    return Bookingdetails;
                }
            }

        });
    }

}]);


