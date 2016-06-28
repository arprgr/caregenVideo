
'use strict';
angular.module('Home', ['ngDialog','Authentication'])
    
    .controller('HomeController',
        ['$scope', 'ngDialog', '$location', '$rootScope', 'AuthenticationService',
            function ($scope, ngDialog, $location, $rootScope, AuthenticationService) {

                $scope.clickToOpen = function () {
                
                    ngDialog.open({
                        template: 'Views/Login/signIn.html',
                        className: 'ngdialog-theme-default',
                        scope: $scope
                    });
                }

                $scope.clickToOpenRegister = function () {
                    ngDialog.open({
                        template: 'Views/Registration/register.html',
                        className: 'ngdialog-theme-default',
                        scope: $scope
                    });
                }
                
                $scope.buttonClick = function() {
                    $scope.dataLoading = true;

                    AuthenticationService.VerifyId($scope.formData, function(response) {

                        if(response.status > 200 ) {
                               AuthenticationService.SetCredentials($scope.formData.email);
                            $location.path('/verify');
                        } else {
                            console.log(response.data.name);
                            console.log(response.data.emailid);
                           ngDialog.open({
                               template: 'Views/Login/signIn.html',
                               className: 'ngdialog-theme-default',
                               scope: $scope
                           });

                            $scope.dataLoading = false;
                        }
                    });

         
                }
            }]);

