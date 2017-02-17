'use strict';
angular.module('Home', ['ngDialog','Authentication'])
    
    .controller('HomeController',
        ['$scope', 'ngDialog', '$location', '$rootScope','$cookieStore' ,'SharedData','AuthenticationService',
            function ($scope, ngDialog, $location, $rootScope, $cookieStore,SharedData, AuthenticationService) {

                $scope.formData= {
                    email: $rootScope.registerEmail
                };

                $scope.clickToOpen = function () {
                
                        ngDialog.open({
                        template: 'Views/Login/signIn.html',
                        className: 'ngdialog-theme-default',
                        scope: $scope,
                    });
                }

                $scope.clickToOpenRegister = function () {
                    ngDialog.open({
                        template: 'Views/Registration/register.html',
                        className: 'ngdialog-theme-default',
                        scope: $scope
                    });
                }

                $scope.addUserClick = function () {
                  
                    AuthenticationService.addUser($scope.formData,function(response){
                        if(response.status > 200 ){

                        } else {
                            AuthenticationService.ClearCredentials();
                            AuthenticationService.SetCredentials($scope.formData.email);
                            ngDialog.open({
                                template: 'Views/Login/signIn.html',
                                className: 'ngdialog-theme-default',
                                scope: $scope
                            });

                        }
                            });
                }
                
                $scope.buttonClick = function() {
                    $scope.dataLoading = true;
                    
                    console.log("checking if user existis");

                    AuthenticationService.VerifyId($scope.formData, function(response) {

                        if(response.status > 200 ) {
                               AuthenticationService.SetCredentials($scope.formData.email);
                               AuthenticationService.sendEmail($scope.formData);
                               ngDialog.close();
                               $location.path('/verify');
                        } else {
                           ngDialog.open({
                               template: 'Views/Login/signIn.html',
                               className: 'ngdialog-theme-default',
                               scope: $scope
                           });

                            $scope.dataLoading = false;
                        }
                    });

         
                }
                
             $scope.handleFBLogin = function() {
                    
                    console.log('Handling FB login in controller'); 
                    
                    FB.api('/me?fields=id,name,email,birthday', function(response) {
                      console.log(response.email);  
                      console.log(response.name);
                      console.log(response.birthday);

                     $scope.formData= {
                        fbid: response.id,
                        email: response.email,
                        name: response.name,
                        password: 'facebook',
                        senderEmailid: response.email
                    };     
                    });
                  
                    FB.api('/me/picture?type=normal', function(response) {

                        var userpic = {
                        userphoto : response.data.url
                        }; 
                      angular.extend($scope.formData, userpic); 
                    
                    console.log($scope.formData);

                  
                       AuthenticationService.addFBUser($scope.formData,function(response){
                        if(response.status == 230 || response.status == 200){
                            console.log('ok to proceed with login and to the main page');
                            
                            $rootScope.userName = $scope.formData.name;
                            $rootScope.userEmailId = $scope.formData.email;
                            $rootScope.fbid = $scope.formData.fbid ;
                            $rootScope.userphoto = $scope.formData.userphoto;
                            AuthenticationService.SetFBUserCredentials( $scope.formData.email, $scope.formData.name, $scope.formData.fbid,$scope.formData.userphoto);
                             SharedData.setValue(response.data.emailid);
                             var senderEmailid = $scope.formData.email ;
                             angular.extend($scope.formData, senderEmailid); 
                         
                            
                            $cookieStore.put('userEmailId', $rootScope.userEmailId);
                            
                            AuthenticationService.getSentInvitations($scope.formData, function(response) {

                                if(response.data.length == 0){
                                    $rootScope.noInvitations = 'No invitations.';
                                }else {
                                    $rootScope.noInvitations = '';
                                }

                                $rootScope.sentInvitationID = response.data;
                                $cookieStore.put('sentInvitationID', $rootScope.sentInvitationID);

                             });

                            AuthenticationService.getReceivedInvitations($scope.formData, function(response) {

                                if(response.data.length == 0){
                                    if($rootScope.noInvitations !== ''){

                                    $rootScope.noInvitations = 'No invitations.'; }
                                }else{
                                    $rootScope.noInvitations = '';
                                }

                                $rootScope.receivedInvitationID = response.data;
                                $cookieStore.put('receivedInvitationID', $rootScope.receivedInvitationID);
                                $cookieStore.put('noInvitations', $rootScope.noInvitations);
                            });


                            AuthenticationService.getConnections($scope.formData, function(response) {

                              if(response.data.length == 0){

                                  $rootScope.noConnections = 'You have no connections yet.';
                               } else {
                                $rootScope.noConnections = '';
                                $cookieStore.put('connectionsID', $rootScope.connectionsID);

                               }
                                $rootScope.connectionsID = response.data;
                                $cookieStore.put('connectionsID', $rootScope.connectionsID );
                                $cookieStore.put('noConnections', $rootScope.noConnections);
                            });

                            AuthenticationService.getMessageInfo($scope.formData, function(response) {

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
                            
                            
                             AuthenticationService.getNotifications ($scope.formData, function(response) {

                                if(response.data.length == 0){
                                    if($rootScope.notifications !== ''){

                                    $rootScope.noNotifications = 'No Messages'; }
                                }else{
                                    $rootScope.noNotifications = '';
                                }
                                
                                $rootScope.notifications = response.data;
                                $cookieStore.put('notifications', $rootScope.notifications);
                                console.log($rootScope.notifications);
                                
                            });
                            
                            $cookieStore.put('registerEmail', $rootScope.registerEmail);

                                                        
                            $location.path('/main');

                            
                        } 
                    });
                    
                    });
                      
             }      

         
               $scope.handleInvite = function() {
                    $scope.dataLoading = true;
                    
                    console.log("In Handle Invite" + $rootScope.registerEmail);

                    AuthenticationService.VerifyId($scope.formData, function(response) {

                        if(response.status > 200 ) {
                               AuthenticationService.SetCredentials($scope.formData.email);
                               console.log('user does not exist, going to registration page');
                               window.location.href=window.location.protocol + "//" + window.location.host + "/Index.html#/?origin=email&emailid=" + $rootScope.registerEmail;
                        } else {
                            window.location.href=window.location.protocol + "//" + window.location.host + "/Index.html#/?user=existing&emailid=" + $rootScope.registerEmail;
                           };

                            $scope.dataLoading = false;
                        });

         
                } 
               
        $scope.videoView = function (vid) {
                        var vUrl = "https://res.cloudinary.com/simplifyit/video/upload/v1482338158/" + vid +".webm";
                                     ngDialog.open({
                                         template: 'Views/video_mesg/videoView.html',
                                         className: 'ngdialog-theme-default',
                                         data: {'vUrl': vUrl},    
                                         scope: $scope,
                                         showClose : true,
                                         closebyDocument: true,    
                                         closeByNavigation: false
                                    });
        
            }   
               
            
            }]);

