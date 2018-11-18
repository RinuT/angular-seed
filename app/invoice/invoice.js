
    'use strict';

    var app=angular.module('myApp.invoice', ['ngRoute'])
    
    app.config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/invoice', {
        templateUrl: 'invoice/invoice.html',
        controller: 'invoiceCtrl'
      })
      .when('/invoice-success', {
        templateUrl: 'invoice-success/invoice-success.html',
        controller: 'invoice-successCtrl'
      });
    }])
    
    app.controller('invoiceCtrl', ['$scope','myservice','$http','$timeout',function ($scope,myservice,$http,$timeout) {
        $scope.POData=[];
        $scope.notGenerated=[];
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
      $scope.poData.poNumber=data.poNumber
          $scope.poData.materialCode=data.materialCode
          $scope.poData.batchId=data.batchCode
          $scope.poData.invoiceDoc=data.invDocNum
          $scope.poData.quantity=data.consumptionQuantity
          $scope.poData.amount=data.invoiceAmount
          $scope.poData.poStatus=data.invoiceStatus
          if(data.invoiceStatus =="Payment Pending" ){
          //$scope.poData.poStatus=data.purchaseorder.batch[i].batch.invoice[j].invoiceStatus
          $scope.PODataPending.push($scope.poData) 
          console.log("$scope.PODataPending")
          console.log($scope.PODataPending)
          $scope.Pending=true
         
        //window.location.reload();
        }
        else if(data.invoiceStatus =="Invoice Generated" ){
         // $scope.poData.poStatus=data.purchaseorder.batch[i].batch.invoice[j].invoiceStatus
          $scope.PODataGenerated.push($scope.poData)
          console.log("$scope.PODataGenerated")
        console.log($scope.PODataGenerated)
          $scope.Unpaid=true
          }
          else if(data.invoiceStatus =="Paid" ){
            //$scope.poData.poStatus=data.purchaseorder.batch[i].batch.invoice[j].invoiceStatus
            $scope.PODataPaid.push($scope.poData)
            console.log("$scope.PODataPaid")
        console.log($scope.PODataPaid) 
             $scope.paid=true
             
            }
            $scope.loading=false
          }
      
        function doSocketOpen(evt) {
        console.log('Open.');
        }
        $scope.onload=function(){
          init()
          var requestInfo = Request();
          var request=
          {
            "$class": "com.cts.ipm.p2pNetwork.displayInvoice"
      }     
        var res = $http.post('http://ec2-54-158-121-223.compute-1.amazonaws.com:3000/api/displayInvoice',request).then(function successCallback(response){
                     $scope.update_response=response;
                     $scope.transactionId=$scope.update_response.data.transactionId
                    
                     
                 }, function errorCallback(response){
                     console.log("POST-ing of data failed");
                     $scope.loading=false
                 });
        
           
           function Request() {
           
             return {
               "Request" : {
                "$class": "com.cts.ipm.p2pNetwork.displayInvoice"
          }     
               }
             };  
            
             
             }
               $scope.generateInvoice=function(id){
                 $scope.loading=true
                myservice.xxx=id
               }
             
       
                $scope.navigate=function(url){
                    window.location = url;
        }
      
       
         }]);
      
         app.controller('invoice-successCtrl', ['$scope','myservice','$http','$timeout',function ($scope,myservice,$http,$timeout) {$scope.POData=[];
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
          $scope.loading=true
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
       $scope.loading=true
         $scope.setValueInvoice();
         }
         $scope.setValueInvoice=function() {
           var requestInvoice=
           {
            "$class": "com.cts.ipm.p2pNetwork.InvoiceStatus",
            "invDocNum":  $scope.inv,
            "invoiceStatus": "Payment Pending"
          }
          
            
      
             var requestInfo = RequestInvoice();
           
             data : requestInfo
         
           var res = $http.post('http://ec2-54-158-121-223.compute-1.amazonaws.com:3000/api/InvoiceStatus',requestInvoice).then(function successCallback(response){
                //   alert("Successfully placed order");
                   $scope.update_response=response;
                  $scope.loading=false
                   $scope.Search1=true
                   $scope.sucess2=true
                   $scope.transactionId=$scope.update_response.data.transactionId
                   
               }, function errorCallback(response){
                 $scope.fialuier3=true
                 $scope.loading=false
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
      
            
        app.service('myservice', function() {
          this.xxx = "yyy";
        });