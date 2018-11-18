'use strict';

angular.module('myApp.schneider_goodReceipt', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/schneider_goodReceipt', {
    templateUrl: 'schneider_goodReceipt/schneider_goodReceipt.html',
    controller:'schneider_goodReceiptCtrl'
  });
}])

.controller('schneider_goodReceiptCtrl', ['$scope','$http','$timeout',function ($scope,$http,$timeout) {
  $scope.fialuier=false
  $scope.sucess=false
  $scope.CreationDate = new Date();
 
  $scope.navigate=function(url){
    window.location = url;

  }
  $scope.POData=[];
  $scope.batchShipped=[];
  $scope.poData={}
  $scope.poData.poNumber=""
  $scope.poData.poDate=""
  $scope.poData.poStatus=""
  $scope.search=false
  $scope.BatchId=""
  $scope.PONumber=""
  $scope.LineNo=" "
  $scope.price=" "
  $scope.SEmaterialCode=" "
  $scope.POQty=" "
  $scope.UOP=" "
  $scope.id=""
  $scope.DeliveryDate=" "
 $scope.Currency=" "
 $scope.deliveryNoteNo=" "
 $scope.shippmentDate=" "
 $scope.shippedQty=" "
 $scope.poData.val=" "
 $scope.failuer1=false
 $scope.failuer2=false
 $scope.batchFall=false
 $scope.Batch={}
 $scope.data=""
 var z=0
 $scope.Batch.shippedQuantity=" "
 $scope.Batch.batchCode=" "
    $scope.Batch.batchStatus=" "
    $scope.Batch.recievedQuantity=" "
     $scope.batch=[]
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
  if($scope.search==false){
 
  //for(var i=0;i<data.podata.length;i++){
  $scope.poData.poNumber=data.poNumber
  $scope.poData.poDate=data.purchaseorder.creationDate
  $scope.poData.poStatus=data.purchaseorder.status
  
  if( $scope.poData.poStatus=="Closed"){
    $scope.poData.val=1;
  }
  else
  $scope.poData.val=0;
  $scope.POData.push($scope.poData)
  $scope.POData.length;
  $scope.poData={}
  //}
  }
  else{

  $scope.PONumber=data.poNumber
  $scope.LineNo=data.purchaseorder.lineNumber
  $scope.price=data.purchaseorder.price
  $scope.SEmaterialCode=data.purchaseorder.materialCode
  $scope.POQty=data.purchaseorder.orderQuantity
  $scope.totalRecieved=data.purchaseorder.receivedQuantity
  $scope.requirment=data.purchaseorder.requiredQuantity
  $scope.UOP=data.purchaseorder.uop
  $scope.POCreationDate=data.purchaseorder.creationDate
  $scope.DeliveryDate=data.purchaseorder.deliveryDate
  $scope.dateC = new Date($scope.POCreationDate); 
  $scope.dateD = new Date($scope.DeliveryDate);
 $scope.Currency=data.purchaseorder.currency
 for(var i=0;i<data.purchaseorder.batch.length;i++){
    $scope.Batch.batchCode=data.purchaseorder.batch[i].batchCode
    $scope.Batch.shippedQuantity=data.purchaseorder.batch[i].batch.shippedQuantity
    $scope.Batch.batchStatus=data.purchaseorder.batch[i].batch.batchStatus
    $scope.Batch.recievedQuantity=data.purchaseorder.batch[i].batch.recievedQuantity
    if($scope.Batch.batchStatus==="recieved")
     $scope.batch.push($scope.Batch)
     else
     $scope.batchShipped.push($scope.Batch)
     $scope.Batch={}
 }
 $scope.loading=false
  }

  }

  function doSocketOpen(evt) {
  console.log('Open.');
  }
  init()

  $scope.submit=function(id){

      $scope.id=id
      $scope.loading=true
      $scope.search=true
      console.log(id)
      $scope.setSearchValue()
    
    

  }
  $scope.setSearchValue=function() {
     var request=
                 {
                  "$class": "com.cts.ipm.p2pNetwork.searchOrder",
                  "poNumber": $scope.id
            }
            
       var requestInfo = RequestSearch();
     
       data : requestInfo
   
     var res = $http.post('http://ec2-54-158-121-223.compute-1.amazonaws.com:3000/api/searchOrder',request).then(function successCallback(response){

         }, function errorCallback(response){
          $scope.loading=false
         });
   }
   

function RequestSearch() {
   
   return {
        
    "Request" : {
        "$class": "com.cts.ipm.p2pNetwork.searchOrder",
        "poNumber": ""
      }
     }
   };
   $scope.proceed=function(data){
  if($scope.batch.length>0){
      for(var i=0;i<$scope.batch.length;i++){
        if($scope.batch[i].batchCode==data ){
          z++;
          $scope.batchFall=true
          break;
        }
      }if(z==0){
        $scope.id=data
        $scope.loading=true
        $scope.search=true
       // console.log(id)
        $scope.setProceed()
      }
    }
    else{
      $scope.id=data
        $scope.loading=true
        $scope.search=true
       // console.log(id)
        $scope.setProceed()
    }
     

  }
  $scope.setProceed=function() {
    var shipmentDate = new Date();
    shipmentDate=$scope.ShipmentDate
   var CreationDate = new Date();
   CreationDate=$scope.dateC
  
    var request=
              
                 {
            "$class": "com.cts.ipm.p2pNetwork.GoodsReceipt",
            "receiptId": $scope.receiptId,
            "goodreceipt": {
                "$class": "com.cts.ipm.p2pNetwork.receipt",
                "poNumber": $scope.PONumber,
                "lineNumber": "",
                "materialCode": $scope.SEmaterialCode,
                "quantity": "",
                "UOP": "",
                "receiptDate": shipmentDate.toString(),
                "receivedQuantity":  $scope.shipmentQuantity,
                "batchId": $scope.id,
                "invoiceStatus": ""
            }
            }
          
            
       var requestInfo = RequestProceed();
     
       data : requestInfo
   
     var res = $http.post('http://ec2-54-158-121-223.compute-1.amazonaws.com:3000/api/GoodsReceipt',request).then(function successCallback(response){
             $scope.update_response=response;
             $scope.transactionId=$scope.update_response.data.transactionId
             $scope.sucess=true
             $scope.loading=false
             
         }, function errorCallback(response){
          $scope.failuer2=true
          $scope.loading=false
         });
 
    
   }
   

function RequestProceed() {
   
   return {
        
    "Request" :{
      "$class": "com.cts.ipm.p2pNetwork.GoodsReceipt",
      "receiptId": " ",
      "goodreceipt": {
        "$class": "com.cts.ipm.p2pNetwork.receipt",
        "poNumber": " ",
        "lineNumber": " ",
        "materialCode": " ",
        "quantity": " ",
        "UOP": " ",
        "receiptDate": " ",
        "receivedQuantity": " ",
        "batchId": " ",
        "invoiceStatus": " "
    }
    }
    
            
     }

   };
   }]);