'use strict';

angular.module('Authentication')

    .factory('AuthenticationService',
        ['Base64', '$http', '$cookieStore', '$rootScope','$timeout',
         function (Base64, $http, $cookieStore, $rootScope, $timeout){

          var service = {};
                   

             service.Login= function(userdata, callback) {

                 $http({
                     method: 'POST',
                     url: '/authenticateUser',
                     data: userdata
                 })
                     .then(function successCallback(response) {
                           callback(response);
                     });

             };

             service.sendEmail= function(emailid, callback) {
                 console.log(emailid);
                 $http({
                     method: 'POST',
                     url: '/sendEMail',
                     data: emailid
                 })
                     .then(function successCallback(response) {

                         callback(response);
                     });


             };

             service.addUser= function(formdata, callback){

                 $http({
                     method: 'POST',
                     url: '/addNewUser',
                     data: formdata
                 })
                     .then(function successCallback(response) {
                         callback(response);
                     });

             };

            service.addFBUser = function(formdata, callback){

                 $http({
                     method: 'POST',
                     url: '/handleFBUsers',
                     data: formdata
                 })
                     .then(function successCallback(response) {
                         callback(response);
                     });

             };

             service.VerifyId= function(emailid, callback){

                  $http({
                     method: 'POST',
                     url: '/checkUserExists',
                     data: emailid
                 })
                     .then(function successCallback(response) {
                            callback(response);
                     });

             };

             service.getReceivedInvitations = function(formdata, callback){

                 $http({
                     method: 'POST',
                     url: '/getReceivedInvitations',
                     data: formdata
                 })
                     .then(function successCallback(response) {
                         callback(response);
                     });

             };

             service.getSentInvitations = function(formdata, callback){

                 $http({
                     method: 'POST',
                     url: '/getSentInvitations',
                     data: formdata
                 })
                     .then(function successCallback(response) {
                         callback(response);
                     });

             };
            
             service.getMessageInfo = function(formdata, callback){

                 $http({
                     method: 'POST',
                     url: '/getMessageInfo',
                     data: formdata
                 })
                     .then(function successCallback(response) {
                         callback(response);
                     });

             };
             
              service.getAllReminders = function(formdata, callback){

                 $http({
                     method: 'POST',
                     url: '/getAllReminders',
                     data: formdata
                 })
                     .then(function successCallback(response) {
                         callback(response);
                     });

             };
             

             service.getNotifications = function(formdata, callback){

                 $http({
                     method: 'POST',
                     url: '/getNotifications',
                     data: formdata
                 })
                     .then(function successCallback(response) {
                         callback(response);
                     });

             };
             
             service.getAllNotifications = function(formdata, callback){

                 $http({
                     method: 'POST',
                     url: '/getAllNotifications',
                     data: formdata
                 })
                     .then(function successCallback(response) {
                         callback(response);
                     });

             };
             
             service.updateMessageStatus = function(mesgId, callback){

                 $http({
                     method: 'POST',
                     url: '/updateMessageStatus',
                     data: mesgId
                 })
                     .then(function successCallback(response) {
                         callback(response);
                     });

             };
             
             service.updateNotificationStatus = function(notificationId, callback){

                 $http({
                     method: 'POST',
                     url: '/updateNotificationStatus',
                     data: notificationId
                 })
                     .then(function successCallback(response) {
                         console.log('Done updating Notifications' + response);
                         callback(response);
                     });

             };
             
             service.deleteNotification = function(notificationId, callback){

                 $http({
                     method: 'POST',
                     url: '/deleteNotification',
                     data: notificationId
                 })
                     .then(function successCallback(response) {
                         console.log('Done updating Notifications' + response);
                         callback(response);
                     });

             };

             service.sendInvitationsInt= function(formdata, callback){

                 $http({
                     method: 'POST',
                     url: '/sendInvitationsInt',
                     data: formdata
                 })
                     .then(function successCallback(response) {
                         callback(response);
                     });

             };

             service.sendInvitationsExt= function(formdata, callback){

                 $http({
                     method: 'POST',
                     url: '/sendInvitationsExt',
                     data: formdata
                 })
                     .then(function successCallback(response) {
                         callback(response);
                     });

             };

             service.getConnections= function(formdata, callback){

                 $http({
                     method: 'POST',
                     url: '/getConnections',
                     data: formdata
                 })
                     .then(function successCallback(response) {
                         callback(response);
                     });

             };

             service.createConnection= function(formdata, callback){

                 $http({
                     method: 'POST',
                     url: '/createConnection',
                     data: formdata
                 })
                     .then(function successCallback(response) {
                         callback(response);
                     });

             };

             service.ignoreInvitation= function(formdata, callback){

                 $http({
                     method: 'POST',
                     url: '/ignoreInvitation',
                     data: formdata
                 })
                     .then(function successCallback(response) {
                         callback(response);
                     });

             };
             
             service.cancelInvitation= function(inviteIdJson, callback){

                 $http({
                     method: 'POST',
                     url: '/cancelInvitation',
                     data: inviteIdJson
                 })
                     .then(function successCallback(response) {
                         callback(response);
                     });

             };
             
              service.deleteInvitation= function(inviteIdJson, callback){

                 $http({
                     method: 'POST',
                     url: '/deleteInvitation',
                     data: inviteIdJson
                 })
                     .then(function successCallback(response) {
                         callback(response);
                     });

             };
             
             service.resendInvitationInt= function(inviteIdJson, callback){

                 $http({
                     method: 'POST',
                     url: '/resendInvitationInt',
                     data: inviteIdJson
                 })
                     .then(function successCallback(response) {
                         callback(response);
                     });

             };
             
             service.resendInvitationExt= function(inviteIdJson, callback){

                 $http({
                     method: 'POST',
                     url: '/resendInvitationExt',
                     data: inviteIdJson
                 })
                     .then(function successCallback(response) {
                         callback(response);
                     });

             };

             service.SetCredentials = function (emailid, password, username) {

                   var authdata = username;
                 
                 $rootScope.globals = {
                     currentUser: {
                         username: emailid,
                         authdata: authdata
                     }

                 };

                 

               service.setReminder= function(inviteIdJson, callback){
                
                console.log('@@@ in set reminder!!');  
                $http({
                     method: 'POST',
                     url: '/createReminder',
                     data: inviteIdJson
                 }).then(function successCallback(response) {
                         console.log('back from the create reminder function! ' + response);
                         callback(response);
                     });
        
             };

            service.refreshReminder= function(inviteIdJson, callback){
                
                console.log('*** in refresh Reminder!!');  
                $http({
                     method: 'POST',
                     url: '/refreshReminders',
                     data: inviteIdJson
                 }).then(function successCallback(response) {
                         console.log('refreshed Reminders! ' + response);
                         callback(response);
                     });
        
             };

                 $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
                 $cookieStore.put('globals', $rootScope.globals);
//                 $cookieStore.put('registerEmail', $rootScope.registerEmail);

//                 $cookieStore.put('connectionsID', connectionsid);
 //                $cookieStore.put('receivedInvitationID', $rootScope.receivedInvitationID);
//                 $cookieStore.put('sentInvitationID', $rootScope.sentInvitationID);

             };

                 service.SetFBUserCredentials = function (emailid, username, fbid, userphoto) {

                   var authdata = username;
                 $rootScope.globals = {
                     currentUser: {
                         username: emailid,
                         fbid: fbid,
                         userphoto: userphoto,
                         authdata: authdata
                     }

                 };

                 $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
                 $cookieStore.put('globals', $rootScope.globals);
//                 $cookieStore.put('registerEmail', $rootScope.registerEmail);

//                 $cookieStore.put('connectionsID', connectionsid);
 //                $cookieStore.put('receivedInvitationID', $rootScope.receivedInvitationID);
//                 $cookieStore.put('sentInvitationID', $rootScope.sentInvitationID);

             };

             service.ClearCredentials = function () {
                 $rootScope.globals = {};
                 $rootScope.registerEmail = '';
                 $rootScope.connectionsID = '';
                 $rootScope.receivedInvitationID = '';
                 $rootScope.sentInvitationID = '';
                 $rootScope.noConnections = '';
                 $rootScope.noInvitations = '';
                 $rootScope.noMessages = '';

                 $cookieStore.remove('globals');
                 $cookieStore.remove('registerEmail');
                 $cookieStore.remove('connectionsID');
                 $cookieStore.remove('receivedInvitationID');
                 $cookieStore.remove('sentInvitationID');
                 $cookieStore.remove('noConnections');
                 $cookieStore.remove('noInvitations');
                 
                 $http.defaults.headers.common.Authorization = 'Basic ';
             };

             return service;

         }])

    .factory('Base64', function () {
        /* jshint ignore:start */

        var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

        return {
            encode: function (input) {
                var output = "";
                var chr1, chr2, chr3 = "";
                var enc1, enc2, enc3, enc4 = "";
                var i = 0;

                do {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);

                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;

                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }

                    output = output +
                        keyStr.charAt(enc1) +
                        keyStr.charAt(enc2) +
                        keyStr.charAt(enc3) +
                        keyStr.charAt(enc4);
                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";
                } while (i < input.length);

                return output;
            },

            decode: function (input) {
                var output = "";
                var chr1, chr2, chr3 = "";
                var enc1, enc2, enc3, enc4 = "";
                var i = 0;

                // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
                var base64test = /[^A-Za-z0-9\+\/\=]/g;
                if (base64test.exec(input)) {
                    window.alert("There were invalid base64 characters in the input text.\n" +
                        "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                        "Expect errors in decoding.");
                }
                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

                do {
                    enc1 = keyStr.indexOf(input.charAt(i++));
                    enc2 = keyStr.indexOf(input.charAt(i++));
                    enc3 = keyStr.indexOf(input.charAt(i++));
                    enc4 = keyStr.indexOf(input.charAt(i++));

                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;

                    output = output + String.fromCharCode(chr1);

                    if (enc3 != 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 != 64) {
                        output = output + String.fromCharCode(chr3);
                    }

                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";

                } while (i < input.length);

                return output;
            }
        };

        /* jshint ignore:end */
    });