
'use strict';

angular.module('Main',['Authentication','Login', 'ngDialog'])

    .controller('MainController',
        ['$scope', '$location','ngDialog', '$rootScope', '$cookieStore', 'AuthenticationService', 'SharedData', '$interval',
            function ($scope, $location, ngDialog, $rootScope, $cookieStore, AuthenticationService, SharedData, $interval) {


                $scope.dataForm = {};


                $scope.logoutClick = function() {
                    AuthenticationService.ClearCredentials();
                    
                    window.location.href= window.location.protocol + "//" + window.location.host + "/Index.html";
                }
                
                
                
                $scope.MessagesClick = function() {
                    
                    $location.path('/messages');
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
                $scope.promptVideo= function(recepient) {
                      ngDialog.open({
                        template: 'Views/video_mesg/video.html',
                        className: 'ngdialog-theme-default',
                        data: {'videoType':'invite'},    
                        scope: $scope,
                        showClose : true,
                        closebyDocument: true, 
                        closeByNavigation: false
                    }); 

                }
                $scope.sendInviteClick= function(vid) {
                  
                    $rootScope.emailMessageError = '';
                    var senderEmailId = $rootScope.userEmailId;
                    $scope.formData.senderEmailid = senderEmailId;
                    $scope.formData.publicId = vid;
                   
                    
                    $scope.formData.email = $scope.formData.receiverEmailid;
                    
                    console.log('now sending invite:' + $scope.formData.receiverEmailid +':' +senderEmailId +':' + $scope.formData.publicId) ;
                    var checkEmail = '';
                    var emailFound, emailMessage, n;
                    checkEmail = ''; emailFound = ''; emailMessage = '';
                    if (senderEmailId == $scope.formData.receiverEmailid ) {
                         $rootScope.emailMessageError = 'You cannot invite your self..' ;
                    }
                    else {
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
                                $rootScope.waitmessage = 'Please Wait... Invitation is being sent';

                                AuthenticationService.sendInvitationsExt($scope.formData, function(response) {

                                    var item_ext = {
                                        receiverEmailid: $scope.formData.receiverEmailid
                                    };

                                    var refreshUser = {'senderEmailid': $rootScope.userEmailId}      
                                   AuthenticationService.getSentInvitations(refreshUser, function(response) {

                                        if(response.data.length == 0){
                                            $rootScope.noInvitations = 'No invitations.';
                                        }else {
                                            $rootScope.noInvitations = '';
                                        }

                                        $rootScope.sentInvitationID = response.data;
                                        $cookieStore.put('sentInvitationID', $rootScope.sentInvitationID);

                                    });
                                    $rootScope.noInvitations ='';
                                    $cookieStore.put('sentInvitationID', $rootScope.sentInvitationID);
                                    $cookieStore.put('noInvitations', $rootScope.noInvitations);
                                    $cookieStore.put('receivedMessages', $rootScope.receivedMessages);

                                    ngDialog.close( { scope: $scope }
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
                                $rootScope.waitmessage = 'Please Wait... Invitation is being sent';
                           AuthenticationService.sendInvitationsInt($scope.formData, function(response) {

                              if(response.status > 200){

                                 alert("Oops... Error sending mail");
                               }else{

                                   var refreshUser = {'senderEmailid': $rootScope.userEmailId}      
                                   AuthenticationService.getSentInvitations(refreshUser, function(response) {

                                if(response.data.length == 0){
                                    $rootScope.noInvitations = 'No invitations.';
                                }else {
                                    $rootScope.noInvitations = '';
                                }

                                $rootScope.sentInvitationID = response.data;
                                $cookieStore.put('sentInvitationID', $rootScope.sentInvitationID);

                             });
                                   
                                   $cookieStore.put('sentInvitationID', $rootScope.sentInvitationID);
                                   $cookieStore.put('noInvitations', $rootScope.noInvitations);
                                   $cookieStore.put('receivedMessages', $rootScope.receivedMessages);
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
                }

             $scope.postToFB = function () {

                console.log('posting to FB');

                     ngDialog.open({
                                         template: 'Views/Main/PostTOFB.html',
                                         className: 'ngdialog-theme-default',
                                         scope: $scope,
                                         showClose : true,
                                         closebyDocument: true,    
                                         closeByNavigation: false
                                    });

               
               }
                
                
                $scope.acceptInvitationClick = function(index) {
                    var item =  $rootScope.receivedInvitationID[index];
                    
                     item.receiverEmailid = SharedData.getValue();
                     item.receiverEmailid = $rootScope.userEmailId ;

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
                            $cookieStore.put('receivedMessages', $rootScope.receivedMessages);
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
                        $cookieStore.put('receivedMessages', $rootScope.receivedMessages);
                        
                    });
 
                }
                
                 $scope.cancelInvitationClick = function(inviteId) {
                    console.log('cancelling the invitation' + inviteId); 
                    var inviteIdJson = {'inviteId' : inviteId}; 
                    
                    AuthenticationService.cancelInvitation(inviteIdJson, function(response) {
                      

                        if($rootScope.receivedInvitationID = []){
                            $rootScope.noInvitations = 'No invitations';
                        }
                        $cookieStore.put('receivedInvitationID', $rootScope.receivedInvitationID);
                        $cookieStore.put('noInvitations', $rootScope.noInvitations);
                        $cookieStore.put('receivedMessages', $rootScope.receivedMessages);
                        
                    });
                     
                     
                     
                     var refreshUser = {'senderEmailid': $rootScope.userEmailId} 
                     
                       AuthenticationService.getSentInvitations(refreshUser, function(response) {

                                if(response.data.length == 0){
                                    $rootScope.noInvitations = 'No invitations.';
                                }else {
                                    $rootScope.noInvitations = '';
                                }

                                $rootScope.sentInvitationID = response.data;
                                $cookieStore.put('sentInvitationID', $rootScope.sentInvitationID);

                             });     
 
                }
                 
            $scope.deleteInvitationClick = function(index) {
                
                
                    var item =  $rootScope.sentInvitationID[index];
                    var inviteId = item.id;
                
                    console.log('deleting the invitation' + inviteId); 
                
                
                    var inviteIdJson = {'inviteId' : inviteId}; 
                    
                    AuthenticationService.deleteInvitation(inviteIdJson, function(response) {
                      

                        if($rootScope.sentInvitationID = []){
                            $rootScope.noInvitations = 'No invitations';
                        }
                        $cookieStore.put('sentInvitationID', $rootScope.sentInvitationID);
                        $cookieStore.put('noInvitations', $rootScope.noInvitations);
                        $cookieStore.put('receivedMessages', $rootScope.receivedMessages);
                        
                    });
                     
                     
                     $rootScope.sentInvitationID.splice(index, 1);
                         
 
                }     
                
             $scope.callAtInterval = function() {
                console.log("$scope.callAtInterval - Interval occurred");
                 var currUser = {'email': $rootScope.userEmailId};      
                 console.log(currUser);
                 var refreshUser = {'senderEmailid': $rootScope.userEmailId} ;
           
              AuthenticationService.getNotifications (currUser, function(response) {

                                if(response.data.length == 0){
                                    if($rootScope.notifications !== ''){

                                    $rootScope.noNotifications = 'No Notifications'; }
                                }else{
                                    $rootScope.noNotifications = '';
                                }
                                
                                $rootScope.notifications = response.data;
                                $cookieStore.put('notifications', $rootScope.notifications);
                                console.log($rootScope.notifications);
                        
                                var noOfMessages = $rootScope.notifications.filter($scope.checkMessageNotification);
                                var noOfConnections = $rootScope.notifications.filter($scope.checkConnectNotification);
                                var noOfInvites = $rootScope.notifications.filter($scope.checkInviteNotification);
                                var noOfRejects = $rootScope.notifications.filter($scope.checkRejectNotification);
                                var noOfCancel = $rootScope.notifications.filter($scope.checkCancelNotification);
                  
                                console.log('no of Connections =' + noOfConnections.length);
                                console.log('no of Invites =' + noOfInvites.length);
                  
                                if(noOfMessages.length > 0 ) {
                                    //
                                    
                                    console.log('new message in.. need to refresh receieved messages..');
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
                                    
                                    //
                                }
                  
                                if(noOfConnections.length > 0 ) {
                                   // 
                              AuthenticationService.getConnections(refreshUser, function(response) {

                              if(response.data.length == 0){

                                  $rootScope.noConnections = 'You have no connections yet.';
                               } else {
                                $rootScope.noConnections = '';
                                $cookieStore.put('connectionsID', $rootScope.connectionsID);

                               }
                                $rootScope.connectionsID = response.data;
                                $cookieStore.put('connectionsID', $rootScope.connectionsID );
                                $cookieStore.put('noConnections', $rootScope.noConnections);
                                //        
                                });
                                }
                  
                                if(noOfInvites.length > 0 || noOfRejects > 0 || noOfCancel) {
                                    //
                                    console.log('no of Invites =' + noOfInvites.length);
                                     console.log('getting invites for: ' + currUser); 
                                     AuthenticationService.getReceivedInvitations(refreshUser, function(response) {

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
                                }
                                else {
                                    
                                 AuthenticationService.getSentInvitations(refreshUser, function(response) {

                                if(response.data.length == 0){
                                    $rootScope.noInvitations = 'No invitations.';
                                }else {
                                    $rootScope.noInvitations = '';
                                }

                                $rootScope.sentInvitationID = response.data;
                                $cookieStore.put('sentInvitationID', $rootScope.sentInvitationID);

                             });
                                    
                            }
                                
                            });   
                 
                    
                 
            }

        $scope.checkMessageNotification = function(notes) {
            return notes.notificationType === 'Message';
        }
        
        $scope.checkInviteNotification = function(notes) {
            return notes.notificationType === 'Invite';
        }
        
        $scope.checkConnectNotification = function(notes) {
            return notes.notificationType === 'Connection';
        }
        
        $scope.checkRejectNotification = function(notes) {
            return notes.notificationType === 'Rejection';
        }
        
        $scope.checkCancelNotification = function(notes) {
            return notes.notificationType === 'Cancelled';
        }

        $scope.playAudio = function() {
        var audio = new Audio('../../sounds/textalert.wav');
        audio.play();
        };

        $scope.updateNotificationStatus = function (notificationId) {
             var notificationIdJson = {'notificationId' : notificationId};
            console.log('updating notification ' + notificationId);
             AuthenticationService.updateNotificationStatus(notificationIdJson, function(response) {

                              if(response.status > 200){
                                 alert("Could not update Notification");
                        }
                })
        }
        
    $interval( function(){ $scope.callAtInterval(); }, 5000);  
                
                $scope.viewAllNotifications = function() {
                    
                        var currUser = {'email': $rootScope.userEmailId};      
                        console.log(currUser);
                        var refreshUser = {'senderEmailid': $rootScope.userEmailId} ;
                 
                AuthenticationService.getAllNotifications (currUser, function(response) {
                                
                                $rootScope.allNotifications = response.data;
                                $cookieStore.put('allNotifications', $rootScope.allNotifications);
                                console.log($rootScope.allNotifications);
                                
                            }); 
                    
                    ngDialog.open({
                                         template: 'Views/Main/viewNotifications.html',
                                         className: 'ngdialog-theme-default',
                                         scope: $scope,
                                         showClose : true,
                                         closebyDocument: true,    
                                         closeByNavigation: false
                                    });
                              
                }
                
                   $scope.videoView = function (urlToView, mesgId) {
                    var mesgIdJson = {'mesgId' : mesgId};
                   
                     AuthenticationService.updateMessageStatus(mesgIdJson, function(response) {

                              if(response.status > 200){
                                 alert("Could not update Message");
                               }else{

                                     ngDialog.open({
                                         template: 'Views/video/videoView.html',
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

       $scope.deleteItem = function (item, notificationId) {
           var notificationIdJson = {'notificationId' : notificationId};
                    AuthenticationService.deleteNotification(notificationIdJson, function(response) {

                              if(response.status > 200){
                                 alert("Could not update notification");
                               } 
                        
                                else {
                                   
                                   $scope.allNotifications.splice($scope.allNotifications.indexOf(item),1);
                               }
                    });
       }
       
       
       $scope.resendInvitationClick = function (emailid) {
           
           var emailidJson = {'emailid' : emailid};
           
           AuthenticationService.VerifyId(emailidJson, function(response) {
                        var currUserJson = {'senderEmail': $scope.userEmailId,
                                            'email' : emailid
                                           };
                        if(response.status > 200 ) {
                            console.log(emailid + ' has registered sending internal reminder')
                            
                            AuthenticationService.resendInvitationInt(currUserJson, function(response) {

                              if(response.status > 200){
                                 alert("Could not send email reminder please try again");
                               } 
                        
                                else {
                                   
                                 alert("Email reminder sent");
                               }
                            });
                            
                        } else {
                            console.log(emailid + 'has not registered sending external reminder')
                            
                            AuthenticationService.resendInvitationExt(currUserJson, function(response) {

                              if(response.status > 200){
                                 alert("Could not send email reminder please try again");
                               } 
                        
                                else {
                                   
                                 alert("Email reminder sent");
                               }
                            });
                        }
           });
       }
       
    

    }]);