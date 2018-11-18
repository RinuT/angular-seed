'use strict';

var app=angular.module('myApp.flextronics-purchase-order', ['ngRoute'])

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/flextronics-purchase-order', {
    templateUrl: 'flextronics-purchase-order/flextronics-purchase-order.html',
    controller: 'flextronics-purchase-orderCtrl'
  })
  .when('/flextronics-purchase-order-success', {
    templateUrl: 'flextronics-purchase-order-success/flextronics-purchase-order-success.html',
    controller: 'flextronics-purchase-orderCtrl-success'
  });
}])

app.controller('flextronics-purchase-orderCtrl', ['$scope','myservice','$http','$timeout',function ($scope,myservice,$http,$timeout) {
  $scope.POData=[];
          $scope.poData={}
          $scope.poData.poNumber=""
          $scope.poData.poDate=""
         // $scope.poData.poStatus=""
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
         $scope.poData.val=" "
         $scope.failuer1=false
         $scope.failuer2=false
         $scope.loading=true
         $scope.first=true
        
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
           
         // $scope.POData=[]
          //for(var i=0;i<data.podata.length;i++){
          $scope.poData.poNumber=data.poNumber
          $scope.poData.poDate=data.purchaseorder.creationDate
          $scope.poData.poStatus=data.purchaseorder.orderStatus
          
          if( $scope.poData.poStatus=="Closed"){
            $scope.poData.val=1;
          }
          else
          $scope.poData.val=0;
          $scope.POData.push($scope.poData)
          
        console.log("1")
          console.log($scope.POData)
         $scope.poData={}
          $scope.loading=false
          //}
          }
          }

          function doSocketOpen(evt) {
          console.log('Open.');
          }
          
          $scope.onload=function(){
            init()
            var requestInfo = Request();
            var request=
                           {
                            "$class": "com.cts.ipm.p2pNetwork.displayOrders",
                            "supplier":"flextronics"
                      }     
            var res = $http.post('http://ec2-54-158-121-223.compute-1.amazonaws.com:3000/api/displayOrders',request).then(function successCallback(response){
                       $scope.update_response=response;
                       $scope.transactionId=$scope.update_response.data.transactionId
                   
                       
                   }, function errorCallback(response){
                       $scope.failuer1=true
                       $scope.loading=false
                   });
   
             
             function Request() {
             
               return {
                 "Request" : {
                  "$class": "com.cts.ipm.p2pNetwork.displayOrders",
                  "supplier": "flextronics"
                  
                  }
                 }
               };
          }
          
        

          $scope.submit=function(id){
            $scope.first=false
            $scope.loading=true
            myservice.xxx=id
              $scope.search=true
              console.log(id)
             // $scope.setSearchValue()

          }
          
           }]);
   app.controller('flextronics-purchase-orderCtrl-success' ,['$scope','myservice','$http','$timeout',function ($scope,myservice,$http,$timeout) {
      $scope.POData=[];
          $scope.poData={}
          $scope.poData.poNumber=""
          $scope.poData.poDate=""
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
         $scope.poData.val=" "
         $scope.failuer1=false
         $scope.failuer2=false
         $scope.loading=true
         $scope.first=true
        
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
         
            console.log("2")
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
         $scope.loading=false
          console.log(data)
          
          }

          function doSocketOpen(evt) {
          console.log('Open.');
          }
          init()
      $scope.myservice = myservice;
        var request=
                    {
                     "$class": "com.cts.ipm.p2pNetwork.searchOrder",
                     "poNumber": myservice.xxx
               }
               
          var requestInfo = RequestSearch();
        
          data : requestInfo
      
        var res = $http.post('http://ec2-54-158-121-223.compute-1.amazonaws.com:3000/api/searchOrder',request).then(function successCallback(response){
         $scope.search=true
         $scope.loading=false
            }, function errorCallback(response){
             $scope.search=false
             $scope.loading=false
            });
      
      

   function RequestSearch() {
      
      return {
           
       "Request" : {
           "$class": "com.cts.ipm.p2pNetwork.searchOrder",
           "poNumber": ""
         }
        }
      };
      $scope.proceed=function(){
         $scope.search=true
         if($scope.requiredQuantity<$scope.shipmentQuantity){
           alert("shipped Quantity more tyhan required quantity")
         }
         else
         $scope.setProceed()

     }
     $scope.setProceed=function() {
      $scope.loading=true
       var shipmentDate = new Date();
       shipmentDate=$scope.ShipmentDate
      var CreationDate = new Date();
      CreationDate=$scope.dateC
      if(CreationDate <shipmentDate){
       var request=
                       {
             "$class": "com.cts.ipm.p2pNetwork.ShipmentNotification",
             "batchId": $scope.BatchId,
             "deliverynote": {
               "$class": "com.cts.ipm.p2pNetwork.delNote",
               "poNumber": $scope.PONumber,
               "lineNumber": "",
               "materialCode": $scope.SEmaterialCode,
               "UOP": "",
               "shipmentDate": shipmentDate.toString(),
               "supplierId": "flextronics"
             },
             "batch": {
               "$class": "com.cts.ipm.p2pNetwork.batch",
               "shipmentDate": shipmentDate.toString(),
               "receiptDate": "",
               "shippedQuantity": $scope.shipmentQuantity,
               "recievedQuantity": "0",
               "availableQuantity": "0",
               "batchStatus": "",
              "poNumber": "",
              "materialCode": "",
              "invoice": []
             }
           }
          var requestInfo = RequestProceed();
        
          data : requestInfo
      
        var res = $http.post('http://ec2-54-158-121-223.compute-1.amazonaws.com:3000/api/ShipmentNotification',request).then(function successCallback(response){
                $scope.update_response=response;
                $scope.transactionId=$scope.update_response.data.transactionId
                $scope.sucess=true
                $scope.loading=false
                
            }, function errorCallback(response){
             $scope.failuer2=true
             $scope.loading=false
            });
      }
      else
      {
        alert("Shipment Date should be less than creation date")
      }
       
      }
      

   function RequestProceed() {
      
      return {
           
       "Request" :

         {
          "$class": "com.cts.ipm.p2pNetwork.ShipmentNotification",
          "batchId": "",
          "deliverynote": {
            "$class": "com.cts.ipm.p2pNetwork.delNote",
            "poNumber": "",
            "lineNumber": "",
            "materialCode": "",
            "UOP": "",
            "shipmentDate": "",
            "supplierId": ""
          },
          "batch": {
            "$class": "com.cts.ipm.p2pNetwork.batch",
            "shipmentDate": "",
            "receiptDate": "",
            "shippedQuantity": "",
            "recievedQuantity": "",
            "availableQuantity": "",
            "batchStatus": "",
            "poNumber": "",
            "materialCode": "",
            "invoice": []
          }
        }

        }

      };
    }]);
        
    app.service('myservice', function() {
      this.xxx = "yyy";
    });