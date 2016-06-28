
angular.module('Authentication', []);
angular.module('Login', []);
angular.module('Main', []);
angular.module('Registration', []);
angular.module('Home', []);


angular.module('careGenApp', [
    'Authentication',
    'Login',
    'Main',
    'Registration',
    'Home',
    'ngRoute',
    'ngCookies'
])
    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider
            .when('/home', {
                controller: 'HomeController',
                templateUrl: 'Views/Home/Home.html',
             })

            .when('/main', {

                controller: 'MainController',
                templateUrl: 'Views/Main/Main.html'
            })

            .when('/verify', {

                controller: 'HomeController',
                templateUrl: 'Views/Home/EmailVerify.html'
            })

            .otherwise({ redirectTo: '/home' });
    }])

    .run(['$rootScope', '$location', '$cookieStore', '$http',
        function ($rootScope, $location, $cookieStore, $http) {

            // keep user logged in after page refresh
           $rootScope.globals = $cookieStore.get('globals') || {};
            if ($rootScope.globals.currentUser) {
               $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
           }

           $rootScope.$on('$locationChangeStart', function (event, next, current) {
              // redirect to login page if not logged in
                if ($location.path() !== '/home' && !$rootScope.globals.currentUser) {
                   $location.path('/home');
               }
           });
        }]);