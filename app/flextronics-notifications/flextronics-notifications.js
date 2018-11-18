'use strict';

var app=angular.module('myApp.flextronics-notifications', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/flextronics-notifications', {
    templateUrl: 'flextronics-notifications/flextronics-notifications.html',
    controller:'flextronics-notifications-successCtrl_new'
  });
  
}])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/flextronics-notifications-success', {
    templateUrl: 'flextronics-notifications-success/flextronics-notifications-success.html',
    controller:'flextronics-notifications-successCtrl'
  });
  
}])


app.controller('flextronics-notifications-successCtrl', ['$scope','myservice','$http','$timeout',function ($scope,myservice,$http,$timeout) {
  $scope.notGenerated=[];
    $scope.inv="";
    $scope.PODataGenerated=[];
    $scope.PODataPaid=[];
    $scope.poData={}
    $scope.poData.invoiceNo=""
    $scope.poData.invoiceStatus=""
    $scope.poData.consumptionQuantity=""
    $scope.poData.diffDays=""
    $scope.poData.materialCode=""
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
   $scope.materialCode=data.materialCode
   $scope.batchId=data.batchCode
   $scope.poNumber=data.poNumber
   $scope.invoiceId=data.invDocNum
   $scope.quantity=data.consumptionQuantity
   $scope.perUnitPrice=data.invoiceAmount
   $scope.ppoStatus=data.invoiceStatus
    //window.location.reload();
    $scope.loading=false
    }
    $scope.inv=myservice.xxx
  
    function doSocketOpen(evt) {
    console.log('Open.');
    }
   
      init()
      var requestInfo = Request();
      var request=
      {
        "$class": "com.cts.ipm.p2pNetwork.searchInvoice",
        "invDocNum": myservice.xxx
  }  
    var res = $http.post('http://ec2-54-158-121-223.compute-1.amazonaws.com:3000/api/searchInvoice',request).then(function successCallback(response){
                 $scope.update_response=response;
                 $scope.transactionId=$scope.update_response.data.transactionId
                
                 
             }, function errorCallback(response){
                 console.log("POST-ing of data failed");
                 $scope.loading=false
             });
    
       
       function Request() {
       
         return {
           "Request" : {
            "$class": "com.cts.ipm.p2pNetwork.searchInvoice",
            "invDocNum":""
      }     
           
         };  
         
    }
    $scope.generate = function(){
   
     $scope.setValueInvoice();
     }
     $scope.setValueInvoice=function() {
       var requestInvoice=
       {
        "$class": "com.cts.ipm.p2pNetwork.InvoiceStatus",
        "invDocNum":  $scope.inv,
        "invoiceStatus": "Paid"
      }
      
        
  
         var requestInfo = RequestInvoice();
       
         data : requestInfo
     
       var res = $http.post('http://ec2-54-158-121-223.compute-1.amazonaws.com:3000/api/InvoiceStatus',requestInvoice).then(function successCallback(response){
            //   alert("Successfully placed order");
               $scope.update_response=response;
              $scope.loading=true
               $scope.Search1=true
               $scope.sucess2=true
               $scope.transactionId=$scope.update_response.data.transactionId
               
           }, function errorCallback(response){
             $scope.fialuier3=true
           });
     }
     $scope.navigate=function(url){
      window.location = url;
  
    }
     function RequestInvoice() {
     
       return {
         "Request" : {
          "$class": "com.cts.ipm.p2pNetwork.InvoiceStatus",
          "invDocNum": " ",
          "invoiceStatus": "Paid"
        }
        
         }
       };
  
   
     }]);
     app.controller('flextronics-notifications-successCtrl_new', ['$scope','myservice','$http','$timeout',function ($scope,myservice,$http,$timeout) {
      $scope.PODataUnpaid=[];
      $scope.poData={}
      $scope.poData.poNumber=""
      $scope.poData.diffDays=""
      $scope.poData.poStatus=""
      $scope.poData.batchId=""
      $scope.poData.materialCode=""
      $scope.val="1"
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
     $scope.invoiceId=""
     $scope.search=false
    $scope.Pending=false
     var acc = document.getElementsByClassName("accordion");
    var i;
    $scope.CreationDate = new Date();
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
    
      
        $scope.poData.batch=data.batch.batchCode
        $scope.poData.poNumber=data.batch.batch.poNumber
        $scope.poData.materialCode=data.batch.batch.materialCode
        $scope.poData.quantity=data.batch.batch.availableQuantity
        $scope.PODataUnpaid.push($scope.poData)
        $scope.poData={}
        $scope.Pending=true
      
      if($scope.PODataUnpaid.length==0){
    $scope.fall=true
    }
      }
    
      function doSocketOpen(evt) {
      console.log('Open.');
      }
      init()
      var requestInfo = Request();
      var request=
                     {
                      "$class": "com.cts.ipm.p2pNetwork.display"
                }     
      var res = $http.post('http://ec2-54-158-121-223.compute-1.amazonaws.com:3000/api/display',request).then(function successCallback(response){
                 $scope.update_response=response;
                 $scope.sucess=true
                 $scope.transactionId=$scope.update_response.data.transactionId
                
                 
             }, function errorCallback(response){
                 console.log("POST-ing of data failed");
             });
    
       
       function Request() {
       
         return {
           "Request" : {
            "$class":  "com.cts.ipm.p2pNetwork.display"
            
           }
           }
         };
         $scope.generate= function(){
         
     $scope.setValueInvoice();
     }
     $scope.generateInvoice = function(id){
      $scope.search=true
      myservice.xxx=id
     }
     
     $scope.navigate=function(url){
      window.location = url;
    
    }
     function RequestInvoice() {
     
       return {
         "Request" : {
          "$class": "com.cts.ipm.p2pNetwork.generateInvoice",
          "invDocNum": "",
          "selfinvoice": {
            "$class": "com.cts.ipm.p2pNetwork.SelfInvoice",
            "consumptionQuantity": "",
            "invoiceStatus": "",
            "amount": "",
            "materialCode": "",
            "poNumber": "",
            "batch": {
              "$class": "com.cts.ipm.p2pNetwork.newBatch",
              "batchCode": " ",
              "batch": {
                "$class": "com.cts.ipm.p2pNetwork.batch",
                "shipmentDate": "",
                "receiptDate": "",
                "shippedQuantity": "",
                "recievedQuantity": "",
                "availableQuantity": "",
                "batchStatus": "",
                "invoice": []
              }
            },
            "invDocNum": " "
          },
          "batchCode": ""
        }
    
         }
       };
       
         }]);
      
        
    app.service('myservice', function() {
      this.xxx = "yyy";
    });