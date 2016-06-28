
'use strict';

angular.module('Main',['Authentication'])

    .controller('MainController',
        ['$scope', '$location', 'AuthenticationService',
            function ($scope, $location, AuthenticationService) {

                $scope.logoutClick = function() {
                    AuthenticationService.ClearCredentials();
                    $location.path('/home');
                }

            }]);