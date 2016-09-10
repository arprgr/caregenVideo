
'use strict';

angular.module('Messages',['Authentication','Login', 'ngDialog'])
      .config(function($sceDelegateProvider) {
 $sceDelegateProvider.resourceUrlWhitelist([
   // Allow same origin resource loads.
   'self',
   // Allow loading from our assets domain.  Notice the difference between * and **.
   'https://res.cloudinary.com/**']);
 })
    .controller('MessageController',
        ['$scope', '$location','ngDialog', '$rootScope', '$cookieStore', 'AuthenticationService', 'SharedData',
            function ($scope, $location, ngDialog, $rootScope, $cookieStore, AuthenticationService, SharedData) {


                $scope.recepient = {
                    selected:{}
                }  
                
               $scope.recordVideo = function (videoURL) {
                   
                        alert($scope.recepient);
                        console.log($rootScope);            
                        ngDialog.open({
                        template: 'video.html',
                        className: 'ngdialog-theme-default',
                        scope: $scope,
                        showClose : true,
                        closebyDocument: true, 
                        closeByNavigation: false
                    }); 
                }
               
               $scope.videoView = function (urlToView, mesgId) {
                    var mesgIdJson = {'mesgId' : mesgId};
                   alert(mesgIdJson);
                     AuthenticationService.updateMessageStatus(mesgIdJson, function(response) {

                              if(response.status > 200){
                                 alert("Could not update Message");
                               }else{

                                     ngDialog.open({
                                         template: 'videoView.html',
                                         className: 'ngdialog-theme-default',
                                         data: {'vMessageURL':urlToView},    
                                         scope: $scope,
                                         showClose : true,
                                         closebyDocument: true,    
                                         closeByNavigation: false
                                    });
                              
                               
                               var currUser = {'email': $scope.userEmailId};
                               console.log($scope);       
                               console.log(currUser);       
                            
                               AuthenticationService.getMessageInfo(currUser, function(response) {

                                if(response.data.length == 0){
                                    if($rootScope.noMessages !== ''){

                                    $rootScope.noMessages = 'No Messages'; }
                                }else{
                                    $rootScope.noMessages = '';
                                }
                                
                                $rootScope.receivedMessages = response.data;
                                $cookieStore.put('receivedMessages', $rootScope.receivedMessages);
                                console.log($rootScope.receivedMessages);
                                
                            });
                               
                               
                               }
                                
                         
                           });
                       
                         
                        
                }
               
               
            }]);

