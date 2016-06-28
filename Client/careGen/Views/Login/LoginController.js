'use strict';

angular.module('Login', ['ngDialog','Authentication'])

    .controller('LoginController',
        ['$scope', '$location', 'ngDialog', '$rootScope', 'AuthenticationService',
            function ($scope, $location, ngDialog, $rootScope, AuthenticationService) {

                $scope.login = function(){

                    $scope.dataLoading = true;

                    AuthenticationService.Login($scope.formData, function(response) {
                        if(response.status > 200 ){
                            $scope.error = response.message;
                            $scope.dataLoading = false;

                        } else {
                            AuthenticationService.SetCredentials($scope.formData.email, $scope.formData.password);

                            ngDialog.close();
                            $location.path('/main');
                        }
                    });

                };
            }]);


/*angular.module('Authentication', ['ngDialog'])

    .controller('LoginController',
        ['$scope', '$rootScope', '$location', 'AuthenticationService',
            function ($scope, $rootScope, $location, AuthenticationService) {
                // reset login status
                AuthenticationService.ClearCredentials();

                $scope.login = function () {
                    $scope.dataLoading = true;
                    AuthenticationService.Login($scope.username, $scope.password, function(response) {
                        if(response.success) {
                            AuthenticationService.SetCredentials($scope.username, $scope.password);
                            ngDialog.close();
                            $location.path('/main');
                        } else {
                            $scope.error = response.message;
                            $scope.dataLoading = false;
                        }
                    });
                };
            }]); */