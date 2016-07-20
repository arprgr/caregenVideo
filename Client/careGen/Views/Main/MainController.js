
'use strict';

angular.module('Main',['Authentication','Login', 'ngDialog'])

    .controller('MainController',
        ['$scope', '$location','ngDialog', '$rootScope', '$cookieStore', 'AuthenticationService', 'SharedData',
            function ($scope, $location, ngDialog, $rootScope, $cookieStore, AuthenticationService, SharedData) {


                $scope.dataForm = {};


                $scope.logoutClick = function() {
                    AuthenticationService.ClearCredentials();
                    $location.path('/home');
                }

                $scope.addConnectionsClick= function() {
                    $scope.dataLoading = false;
                    $rootScope.waitmessage = '';
                    $rootScope.emailMessageError = '';
                    ngDialog.open({
                        template: 'Views/Main/InviteUser.html',
                        className: 'ngdialog-theme-default',
                        scope: $scope
                    });

                }
                $scope.sendInviteClick= function() {

                    $rootScope.emailMessageError = '';
                    var senderEmailId = SharedData.getValue();


                    $scope.formData.senderEmailid = senderEmailId;

                    $scope.formData.email = $scope.formData.receiverEmailid;
                    var checkEmail = '';
                    var emailFound, emailMessage, n;
                    checkEmail = ''; emailFound = ''; emailMessage = '';
                    AuthenticationService.VerifyId($scope.formData, function(response) {

                        if(response.status > 200 ) {

                            n = $rootScope.sentInvitationID.length;

                            for(var j=0; j < n; j++) {
                                checkEmail = $rootScope.sentInvitationID[j].receiverEmailid;
                                if(checkEmail == $scope.formData.receiverEmailid){
                                    emailFound = 'Yes';
                                    emailMessage = 'You have already sent invitation to ' + $scope.formData.receiverEmailid;
                                     break;
                                }
                            }
                            console.log(emailFound);
                            if (emailFound == ''){
                                $scope.dataLoading = true;
                                $rootScope.waitmessage = 'Please Wait... Invitation is been sent';

                                AuthenticationService.sendInvitationsExt($scope.formData, function(response) {

                                    var item_ext = {
                                        receiverEmailid: $scope.formData.receiverEmailid
                                    };

                                    $rootScope.sentInvitationID.push(item_ext);
                                    $rootScope.noInvitations ='';
                                    $cookieStore.put('sentInvitationID', $rootScope.sentInvitationID);
                                    $cookieStore.put('noInvitations', $rootScope.noInvitations);

                                    ngDialog.close( {
                                        scope: $scope }
                                    );
                                });
                            }else{
                                $rootScope.emailMessageError = emailMessage;
                            }

                        } else {
// Check for existing connections and invitations
                           checkEmail = ''; emailFound = ''; emailMessage = '';

                            n = $rootScope.connectionsID.length;
                           for( var i=0; i < n; i++) {
                                checkEmail = $rootScope.connectionsID[i].connectedToEmailid;
                                if(checkEmail == $scope.formData.receiverEmailid){
                                    emailFound = 'Yes';
                                    emailMessage = 'You are already connected to ' + $scope.formData.receiverEmailid;
                                    break;
                                }
                            }

                            n = $rootScope.sentInvitationID.length;
                            for(var i=0; i < n; i++) {
                                checkEmail = $rootScope.sentInvitationID[i].receiverEmailid;
                                if(checkEmail == $scope.formData.receiverEmailid){
                                    emailFound = 'Yes';
                                    emailMessage = 'You have already sent invitation to ' + $scope.formData.receiverEmailid;
                                    break;
                                }
                            }

                            n = $rootScope.receivedInvitationID.length;
                            for( i=0; i < n; i++) {
                                 checkEmail = $rootScope.receivedInvitationID[i].senderEmailid;
                                if(checkEmail == $scope.formData.receiverEmailid){
                                    emailFound = 'Yes';
                                    emailMessage = 'You are already invited by ' + $scope.formData.receiverEmailid;
                                    break;
                                }
                            }

                            if (emailFound == ''){
                                $scope.dataLoading = true;
                                $rootScope.waitmessage = 'Please Wait... Invitation is been sent';
                           AuthenticationService.sendInvitationsInt($scope.formData, function(response) {

                              if(response.status > 200){

                                 alert("Oops... Error sending mail");
                               }else{

                                   var item = {
                                       receiverEmailid: $scope.formData.receiverEmailid
                                       };

                                   $rootScope.sentInvitationID.push(item);
                                   $rootScope.noInvitations ='';
                                   $cookieStore.put('sentInvitationID', $rootScope.sentInvitationID);
                                   $cookieStore.put('noInvitations', $rootScope.noInvitations);
                                  ngDialog.close( {
                                      scope: $scope }
                                  );

                              }
                                
                           });

                            }else {
                                $rootScope.emailMessageError = emailMessage;

                            }
                        }
                    });

                }

                
                $scope.acceptInvitationClick = function(index) {
                    var item =  $rootScope.receivedInvitationID[index];
                    
                     item.receiverEmailid = SharedData.getValue();

                    AuthenticationService.createConnection(item, function(response) {

                        if(response.status > 200 ) {
                            console.log(response.status);
                        }else {

                        $rootScope.receivedInvitationID.splice(index, 1);

                        $rootScope.connectionsID.push(item);

                        if($rootScope.receivedInvitationID = []){
                            $rootScope.noInvitations = 'No invitations';
                        }
                            $cookieStore.put('connectionsID', $rootScope.connectionsID);
                            $cookieStore.put('receivedInvitationID', $rootScope.receivedInvitationID);
                            $cookieStore.put('noInvitations', $rootScope.noInvitations);
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
                        $cookieStore.put('receivedInvitationID', $rootScope.receivedInvitationID);
                        $cookieStore.put('noInvitations', $rootScope.noInvitations);
                        
                    });
 
                }

            }]);