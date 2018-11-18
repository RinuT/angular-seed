'use strict';

var app=angular.module('myApp.flextronics-report', ['ngRoute'])

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/flextronics-report', {
    templateUrl: 'flextronics-report/flextronics-report.html',
    controller: 'flextronics-reportCtrl'
  });
}])
app.controller('flextronics-reportCtrl', ['$scope','myservice','$http','$timeout',function ($scope,myservice,$http,$timeout) {
  $scope.POData=[];
  $scope.notGenerated=[];
  $scope.PODataGenerated=[];
  $scope.PODataPaid=[];
  $scope.poData={}
  $scope.poData.materialCode=" "
    $scope.poData.quantity=" "
    $scope.poData.date=" "
    $scope.poData.transactionType=" "
  $scope.val="1"
  $scope.Search=false
  $scope.Search1=false
  $scope.fialuier2=false
  $scope.fialuier=false
  $scope.fialuier1=false
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
 $scope.Unpaid=false
 $scope.notGen=false
 $scope.paid=false
 $scope.display=true
 $scope.Pending=false
  $scope.PODataPending=[]
  $scope.loading=true
  $scope.id=""
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
    
 let data =JSON.parse(evt.data);
 /*
 if(data.purchaseorder.batch.length>0){
  for(var i=0;i<data.purchaseorder.batch.length;i++){
    if(data.purchaseorder.batch[i].batch.invoice.length>0){
   
    for(var j=0;j<data.purchaseorder.batch[i].batch.invoice.length;j++){
    $scope.poData.poNumber=data.poNumber
    $scope.poData.materialCode=data.purchaseorder.materialCode
    $scope.poData.batchId=data.purchaseorder.batch[i].batchCode
    $scope.poData.invoiceDoc=data.purchaseorder.batch[i].batch.invoice[j].invDocNum
    $scope.poData.perUnitPrice=data.purchaseorder.price
    $scope.poData.quantity=""
    $scope.poData.amount=""
    if(data.purchaseorder.batch[i].batch.invoice[j].invoiceStatus =="Status Pending" ){
    $scope.poData.poStatus=data.purchaseorder.batch[i].batch.invoice[j].invoiceStatus
    $scope.PODataPending.push($scope.poData) 
    console.log("$scope.PODataPending")
    console.log($scope.PODataPending)
    $scope.Pending=true
    }
    else if(data.purchaseorder.batch[i].batch.invoice[j].invoiceStatus =="Invoice Generated" ){
      $scope.poData.poStatus=data.purchaseorder.batch[i].batch.invoice[j].invoiceStatus
      $scope.PODataGenerated.push($scope.poData)
      console.log("$scope.PODataGenerated")
    console.log($scope.PODataGenerated)
      $scope.Unpaid=true
      }
      else if(data.purchaseorder.batch[i].batch.invoice[j].invoiceStatus =="Paid" ){
        $scope.poData.poStatus=data.purchaseorder.batch[i].batch.invoice[j].invoiceStatus
        $scope.PODataPaid.push($scope.poData)
        console.log("$scope.PODataPaid")
    console.log($scope.PODataPaid) 
         $scope.paid=true
        }
        

    }    
    
  }
  else{
    $scope.poData.poNumber=data.poNumber
    $scope.poData.materialCode=data.purchaseorder.materialCode
    $scope.poData.batchId=data.purchaseorder.batch[i].batchCode
   // $scope.poData.invoiceDoc=data.purchaseorder.batch[i].batch.invoice[j].invDocNum
    $scope.poData.perUnitPrice=data.purchaseorder.price
    $scope.POData.push($scope.poData) 
    console.log("$scope.POData")
    console.log($scope.POData)
    
 $scope.notGen=true
  
    
    $scope.poData={}
    $scope.loading=false
    }
 }
 */

$scope.poData.poNumber=data.report.poNumber
    $scope.poData.materialCode=data.report.materialCode
    $scope.poData.quantity=data.report.quantity
    $scope.poData.date=data.report.date
    $scope.poData.transactionType=data.report.transactionType
  $scope.PODataPending.push($scope.poData)
  $scope.poData={}
  
  $scope.loading=false
  //window.location.reload();
  
 
    }

  function doSocketOpen(evt) {
  console.log('Open.');
  }
  
    init()
    var requestInfo = Request();
    var request=
    {
      "$class": "com.cts.ipm.p2pNetwork.displayReport"
    }
     
  var res = $http.post('http://ec2-54-158-121-223.compute-1.amazonaws.com:3000/api/displayReport',request).then(function successCallback(response){
               $scope.update_response=response;
               $scope.transactionId=$scope.update_response.data.transactionId
              
               
           }, function errorCallback(response){
               console.log("POST-ing of data failed");
               $scope.loading=false
           });
  
     
     function Request() {
     
       return {
         "Request" : {
          "$class": "com.cts.ipm.p2pNetwork.displayReport"
        }
        
         }
       };  
      
         $scope.generateInvoice=function(id){
          myservice.xxx=id
         }
       
 
          $scope.navigate=function(url){
              window.location = url;
  }

 
   }]);

   

      
  app.service('myservice', function() {
    this.xxx = "yyy";
  });