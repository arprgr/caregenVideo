
'use strict';

angular.module('Main',['Authentication','Login', 'ngDialog'])

    .controller('MainController',
        ['$scope', '$location','ngDialog', '$rootScope', 'AuthenticationService', 'SharedData',
            function ($scope, $location, ngDialog, $rootScope, AuthenticationService, SharedData) {


                $scope.dataForm = {};


                $scope.logoutClick = function() {
                    AuthenticationService.ClearCredentials();
                    $location.path('/home');
                }

                $scope.addConnectionsClick= function() {
                    ngDialog.open({
                        template: 'Views/Main/InviteUser.html',
                        className: 'ngdialog-theme-default',
                        scope: $scope
                    });

                }
                $scope.sendInviteClick= function() {
                    var senderEmailId = SharedData.getValue();


                    $scope.formData.senderEmailid = senderEmailId;

                    $scope.formData.email = $scope.formData.receiverEmailid;

                    AuthenticationService.VerifyId($scope.formData, function(response) {

                        if(response.status > 200 ) {

                            AuthenticationService.sendInvitationsExt($scope.formData, function(response) {

                            });
                        } else {

                           AuthenticationService.sendInvitationsInt($scope.formData, function(response) {
                                
                           });
                        }
                        ngDialog.close( {
                            scope: $scope }
                        );
                    });

                }

                
                $scope.acceptInvitationClick = function(index) {
                    var item =  $rootScope.receivedInvitationID[index];
                    
  //                  console.log(item.senderEmailid);
  //                  console.log(SharedData.getValue());
  //                  console.log(item.receiverEmailid);

                    //var receiverEmailID = item.senderEmailid;

                    //var senderEmailId = 
                    //item.senderEmailid = senderEmailId;
                    item.receiverEmailid = SharedData.getValue();
   //                 console.log(item);


                    AuthenticationService.createConnection(item, function(response) {

                        $rootScope.receivedInvitationID.splice(index, 1);

                        $rootScope.connectionsID.push(item);
                        if($rootScope.receivedInvitationID = []){
                            $rootScope.noInvitations = 'No invitations';
                        }

                         });


                }

                $scope.ignoreInvitationClick = function(index) {
                    var item =  $rootScope.receivedInvitationID[index];
                    
                    item.receiverEmailid = SharedData.getValue();
                    
                    AuthenticationService.ignoreInvitation(item, function(response) {
                        $rootScope.receivedInvitationID.splice(index, 1);

                        if($rootScope.receivedInvitationID = []){
                            $rootScope.noInvitations = 'No invitations';
                        }
                        
                    });
 
                }

            }]);