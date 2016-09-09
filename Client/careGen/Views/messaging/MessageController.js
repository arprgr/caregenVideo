
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
               
               $scope.videoView = function (urlToView) {

                        ngDialog.open({
                        template: 'videoView.html',
                        className: 'ngdialog-theme-default',
                        data: {'vMessageURL':urlToView},    
                        scope: $scope,
                        showClose : true,
                        closebyDocument: true,    
                        closeByNavigation: false
                    }); 
                }
               
               
            }]);

