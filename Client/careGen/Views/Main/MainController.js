
'use strict';

angular.module('Main',['Authentication','Login'])

    .controller('MainController', 
        ['$scope', '$location', 'AuthenticationService',
            function ($scope, $location, AuthenticationService) {


                $scope.dataForm = {};
                
                $scope.logoutClick = function() {
                    AuthenticationService.ClearCredentials();
                    $location.path('/home');
                }

            }]);