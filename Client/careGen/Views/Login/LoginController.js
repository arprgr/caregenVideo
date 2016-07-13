'use strict';

angular.module('Login', ['ngDialog','Authentication'])

    .controller('LoginController',
        ['$scope', '$location', 'ngDialog', '$rootScope', 'AuthenticationService', 'SharedData',
            function ($scope, $location, ngDialog, $rootScope, AuthenticationService, SharedData) {

                $scope.login = function(){

                    $scope.dataLoading = true;

                    AuthenticationService.Login($scope.formData, function(response) {
                        if(response.data.name == null){

                            $scope.error = 'Invalid Password';
                            $scope.dataLoading = false;

                        } else {

                            $rootScope.userName = response.data.name;
                            
                            SharedData.setValue(response.data.emailid);
                            $scope.formData.senderEmailid = response.data.emailid;
                            AuthenticationService.getSentInvitations($scope.formData, function(response) {

                                if(response.data.length == 0){
                                    $rootScope.noInvitations = 'No invitations.';
                                }else {
                                    $rootScope.noInvitations = '';
                                }
                                console.log( $rootScope.noInvitations );
                                $rootScope.sentInvitationID = response.data;

                             });

                            AuthenticationService.getReceivedInvitations($scope.formData, function(response) {

                                if(response.data.length == 0){
                                    if($rootScope.noInvitations !== ''){
                                    $rootScope.noInvitations = 'No invitations.'; }
                                }else{
                                    $rootScope.noInvitations = '';
                                }
                                console.log( $rootScope.noInvitations );
                                $rootScope.receivedInvitationID = response.data;
                            });


                            AuthenticationService.getConnections($scope.formData, function(response) {

                              if(response.data.length == 0){
                                  $rootScope.noConnections = 'You have no connections yet.';
                               } else {
                                $rootScope.noConnections = '';
                                $rootScope.connectionsID = response.data;
                               }
                            });

                            AuthenticationService.SetCredentials(response.data.email, response.data.password, response.data.name);

                            ngDialog.close( {
                                scope: $scope }
                            );
                            
                            $location.path('/main');
                        }
                    });

                };

                $scope.clickToForgetPassword = function(){
                    AuthenticationService.SetCredentials('dummy', 'dummy');
                    ngDialog.close();
                    $location.path('/forgetPassword');
                }
            }]);


