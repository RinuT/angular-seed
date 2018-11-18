'use strict';

angular.module('myApp.schneider_consumption', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/schneider_consumption', {
    templateUrl: 'schneider_consumption/schneider_consumption.html',
    controller:'schneider_consumptionCtrl'
  });
}])

.controller('schneider_consumptionCtrl', ['$scope','$http','$timeout',function ($scope,$http,$timeout) {
    var acc = document.getElementsByClassName("accordion");
    var i;
    $scope.navigate=function(url){
      window.location = url;

    }
    $scope.fialuier=false
    $scope.sucess=false
    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight){
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        } 
      });
    }
     $scope.submit = function(){
       $scope.loading=true;

     $scope.setValue();
     }
     $scope.setValue=function() {
       var dateOfConsumption = new Date();
       dateOfConsumption=$scope.dateOfConsumption
       var request=
                                
                                {
            "$class": "com.cts.ipm.p2pNetwork.RecordConsumption",
            "recordId": $scope.id,
            "consumptionrecord": {
              "$class": "com.cts.ipm.p2pNetwork.newConsumptionRecord",
              "poNumber": "",
              "lineNum": "",
              "materialCode": $scope.materialCode,
              "quantity": "",
              "UOP": "",
              "materialDoceDate":dateOfConsumption.toString(),
              "consumptionQuantity": $scope.POQty,
              "invDocNum": ""
            }
          }
          
                  

         var requestInfo = Request();
       
         data : requestInfo
     
       var res = $http.post('http://ec2-54-158-121-223.compute-1.amazonaws.com:3000/api/RecordConsumption',request).then(function successCallback(response){
              // alert("Successfully placed order");
               $scope.update_response=response;
               $scope.sucess=true
               $scope.fialuier=false
               $scope.transactionId=$scope.update_response.data.transactionId
               $scope.loading=false;
           }, function errorCallback(response){
             $scope.fialuier=true
             $scope.sucess=false
             $scope.loading=false;
           });
     }
    
     function Request() {
     
       return {
         "Request" : 
                    {
          "$class": "com.cts.ipm.p2pNetwork.RecordConsumption",
          "recordId": "",
          "consumptionrecord": {
            "$class": "com.cts.ipm.p2pNetwork.newConsumptionRecord",
            "poNumber": "",
            "lineNum": "",
            "materialCode": "",
            "quantity": "",
            "UOP": "",
            "materialDoceDate": "",
            "consumptionQuantity": "",
            "invDocNum": ""
          }
        }
            
         }
       };
     }]);