angular.module('careGen', [])

.controller('mainController', function($scope, $http) {

    $scope.formData = {};
    $scope.todoData = {};


 // add a new user
    $scope.createNewUser = function(todoID) {
        console.log("in function create new user");
        $http.post('/addNewUser', $scope.formData)
            .success(function(data) {
                //$scope.formData = {};
                $scope.userData = data;
                console.log(data);
            })
            .error(function(error) {
                console.log('Error: ' + error);
            });
    }


});
