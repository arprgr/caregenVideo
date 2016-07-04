'use strict';

angular.module('Login', ['ngDialog','Authentication'])

    .controller('LoginController',
        ['$scope', '$location', 'ngDialog', '$rootScope', 'AuthenticationService',
            function ($scope, $location, ngDialog, $rootScope, AuthenticationService) {

                $scope.login = function(){

                    $scope.dataLoading = true;

                    AuthenticationService.Login($scope.formData, function(response) {
                        if(response.data.name == null){

                            $scope.error = 'Invalid Password';
                            $scope.dataLoading = false;

                        } else {
                            AuthenticationService.SetCredentials(response.data.email, response.data.password, response.data.name);
                            
                            $rootScope.userName = response.data.name;
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


