
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
    'ngCookies',
    'ngMessages'
])
    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider
            .when('/home', {
                controller: 'HomeController',
                templateUrl: 'Views/Home/Home.html',
             })

            .when('/main', {

                controller: 'MainController',
                templateUrl: 'Views/Main/Main.html',
                            })

            .when('/verify', {

                controller: 'HomeController',
                templateUrl: 'Views/Home/EmailVerify.html'
            })
            .when('/forgetPassword',{
                controller: 'LoginController',
                templateUrl: 'Views/Login/ForgetPassword.html'

            })
            .when('/login',{
                controller: 'LoginController',
                templateUrl: 'Views/Login/signIn.html'

            })
            .when('/register',{
                controller: 'HomeController',
                templateUrl: 'Views/Home/EmailVerification.html'

            })
            .when('/Index.html?origin=email',{
                controller: 'HomeController',
                templateUrl: 'Views/Home/EmailVerification.html'
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

               if($location.search().origin == 'email') {
                  $rootScope.registerEmail= $location.search().emailid;
 //                  $scope.userData.emailid = $location.search().originEmail;
                 delete $location.$$search.origin;
                 delete $location.$$search.emailid;
  //                $location.search({});
                   $location.$$compose();
                   $location.path('/register');
               } else
                if ($location.path() !== '/home' && !$rootScope.globals.currentUser) {
                   $location.path('/home');
               }
           });
        }]);