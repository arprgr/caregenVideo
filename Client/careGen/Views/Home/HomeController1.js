
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
                    FB.api('/me?fields=email,id,name,picture', function(response) {
                     $scope.formData= {
                        email: response.email,
                        name: response.name,
                        password: 'facebook',
                        senderEmailid: response.email 
                    };      
                       AuthenticationService.addUser($scope.formData,function(response){
                        if(response.status > 190 ){
                            
                            $rootScope.userName = $scope.formData.name;
                            $rootScope.userEmailId = $scope.formData.email;
                            $rootScope.registerEmail = $scope.formData.email;    
                            
                    AuthenticationService.SetCredentials( $scope.formData.email, 'facebook', $scope.formData.name);
                            
                        SharedData.setValue($scope.formData.email);
                            
                            $cookieStore.put('userEmailId', $rootScope.userEmailId);
                             
                            console.log('added user going to main' + $rootScope.userName);
                            

                            $cookieStore.put('userEmailId', $rootScope.userEmailId);
                                        
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
                               window.location.href="http://localhost:3000/Index.html#/?origin=email&emailid=" + $rootScope.registerEmail;
                        } else {
                           window.location.href="http://localhost:3000/Index.html#/?user=existing&emailid=" + $rootScope.registerEmail;
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

