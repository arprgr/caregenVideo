
'use strict';

angular.module('Messages',['Authentication','Login', 'ngDialog'])

    .controller('MessageController',
        ['$scope', '$location','ngDialog', '$rootScope', '$cookieStore', 'AuthenticationService', 'SharedData',
            function ($scope, $location, ngDialog, $rootScope, $cookieStore, AuthenticationService, SharedData) {


                $scope.recepient = {
                    selected:{}
                }  
                
               $scope.recordVideo = function () {
                   
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
               
               $scope.videoClick = function () {
               
                   //$location.path('/video');
                   window.open("video.html", "_blank", "toolbar=yes,location=no,scrollbars=yes,resizable=yes,top=200,left=500,width=700,height=500");
                   
               } 
               
            }]);
