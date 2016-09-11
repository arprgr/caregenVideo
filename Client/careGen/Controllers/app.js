
angular.module('Authentication', []);
angular.module('Login', []);
angular.module('Main', []);
angular.module('Registration', []);
angular.module('Home', []);
angular.module('Messages', []);


angular.module('careGenApp', [
    'Authentication',
    'Login',
    'Main',
    'Registration',
    'Home',
    'ngRoute',
    'ngCookies',
    'ngMessages',
    'ngPassword',
    'Messages'

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
            .when('/messages',{
                controller: 'MessageController',
                templateUrl: 'Views/messaging/Messages.html'
            })
            .when('/video',{
                controller: 'MessageController',
                templateUrl: 'video.html'
            })

             .otherwise({ redirectTo: '/home' });
    }])

    .run(['$rootScope', '$location', '$cookieStore', '$http',
        function ($rootScope, $location, $cookieStore, $http) {

            // keep user logged in after page refresh
           $rootScope.globals = $cookieStore.get('globals') || {};
            if ($rootScope.globals.currentUser) {
                $rootScope.userName = $rootScope.globals.currentUser.authdata;
                $rootScope.registerEmail = $cookieStore.get('registerEmail');
                $rootScope.connectionsID = $cookieStore.get('connectionsID') || [];

                $rootScope.receivedInvitationID =  $cookieStore.get('receivedInvitationID');
                $rootScope.sentInvitationID =  $cookieStore.get('sentInvitationID');

                $rootScope.noConnections = $cookieStore.get('noConnections');
                $rootScope.noInvitations = $cookieStore.get('noInvitations');
                $rootScope.receivedMessages = $cookieStore.get('receivedMessages');
                console.log('refresing page');
                console.log($location.path());
                //$location.path('/main')
                 }

           $rootScope.$on('$locationChangeStart', function (event, next, current) {
              // redirect to login page if not logged in

               if($location.search().origin == 'email') {
                  $rootScope.registerEmail= $location.search().emailid;

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
        }])

.factory('SharedData', function() {

    // private
    var value = 0;

    // public
    return {

        getValue: function() {

            return value;
        },

        setValue: function(val) {

            value = val;
           
        }

    };
});

