
'use strict';
angular.module('Home', ['ngDialog','Authentication'])
    
    .controller('HomeController',
        ['$scope', 'ngDialog', '$location', '$rootScope', 'AuthenticationService',
            function ($scope, ngDialog, $location, $rootScope, AuthenticationService) {

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
            }]);

