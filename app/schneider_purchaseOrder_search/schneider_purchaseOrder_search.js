'use strict';

angular.module('myApp.schneider_purchaseOrder_search', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/schneider_purchaseOrder_search', {
    templateUrl: 'schneider_purchaseOrder_search/schneider_purchaseOrder_search.html',
    controller:'schneider_purchaseOrder_searchCtrl'
  });
}])

.controller('schneider_purchaseOrder_searchCtrl', ['$scope','$http','$timeout',function ($scope,$http,$timeout) {
  $scope.search=false
  $scope.BatchId=""
  $scope.PONumber=""
  $scope.LineNo=" "
  $scope.price=" "
  $scope.SEmaterialCode=" "
  $scope.POQty=" "
  $scope.UOP=" "
  $scope.DeliveryDate=" "
 $scope.Currency=" "
 $scope.deliveryNoteNo=" "
 $scope.shippmentDate=" "
 $scope.shippedQty=" "
 $scope.failuer=false
 $scope.search=false
 
function init(){
  var websocket =new WebSocket("ws://ec2-54-158-121-223.compute-1.amazonaws.com:3000");
  websocket.addEventListener('open',evt =>doSocketOpen(evt));
  websocket.addEventListener('message',evt =>doSocketMessage(evt));
  websocket.addEventListener('close',evt =>doSocketClose(evt));
  }
  function doSocketClose(evt) {
  console.log('Close.');
  }
  function doSocketMessage(evt) {
    let data={}
  data =JSON.parse(evt.data);


 // $scope.batchId=data.purchaseorder.creationDate
 $scope.search=true
  $scope.PONumber=data.poNumber
  $scope.LineNo=data.purchaseorder.lineNumber
  $scope.price=data.purchaseorder.price
  $scope.SEmaterialCode=data.purchaseorder.materialCode
  $scope.POQty=data.purchaseorder.orderQuantity
  $scope.UOP=data.purchaseorder.uop
  $scope.Price=data.purchaseorder.price
  $scope.Supplier=data.purchaseorder.supplier
  $scope.POCreationDate=data.purchaseorder.creationDate
  $scope.DeliveryDate=data.purchaseorder.deliveryDate
  $scope.dateC = new Date($scope.POCreationDate); 
  $scope.dateD = new Date($scope.DeliveryDate);
 $scope.Currency=data.purchaseorder.currency
 $scope.loading=false
  
  
 
  }

  function doSocketOpen(evt) {
  console.log('Open.');
  }
  init()

$scope.navigate=function(url){
  window.location = url;

}
 $scope.submit = function(){
  $scope.loading=true
 $scope.setValue();
 }
 $scope.setValue=function() {
 
   var request=
   {
      "$class": "com.cts.ipm.p2pNetwork.searchOrder",
      "poNumber": $scope.PONumber

               }
     var requestInfo = Request();
   
     data : requestInfo
 
   var res = $http.post('http://ec2-54-158-121-223.compute-1.amazonaws.com:3000/api/searchOrder',request).then(function successCallback(response){
           //alert("Successfully placed order");
           $scope.update_response=response;
           $scope.sucess=true
           $scope.transactionId=$scope.update_response.data.transactionId
           
       }, function errorCallback(response){
         $scope.failuer=true
         $scope.loading=false
       });
 }

 function Request() {
 
   return {
     "Request" : {
      "$class": "com.cts.ipm.p2pNetwork.searchOrder",
      "poNumber": " "
       
     }
     }
   };
 }]);