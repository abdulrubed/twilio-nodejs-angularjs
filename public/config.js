!(function() {
    'use strict';
    angular.module('myApp').config(function($stateProvider, $urlRouterProvider, $locationProvider) {

        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode({enabled: true,requireBase:false});

        $stateProvider.state('root', {
            url: '/',
            views: {
                'content': {
                    templateUrl: 'modules/auth/login.html',
                    controller: 'AuthController',
                    resolve: {
                        loadPlugin: function($ocLazyLoad) {
                            return $ocLazyLoad.load([{
                                name: 'AuthController',
                                files: ['modules/auth/AuthController.js']
                            }]);
                        }
                    }
                }
            },
            data: {
                isAuthenticate: false
            }

        });



    });


    angular.module('myApp').run(['$rootScope', '$state', '$location', 'UtilityService', function($rootScope, $state, $location, UtilityService) {
        $rootScope.$on('$stateChangeStart', function(event, toState) {
            // var loggedInUser = UtilityService.getLocalStorage('user');

            //   if (loggedInUser && !toState.data.isAuthenticate) { 
            //      // event.preventDefault();
            //       $location.path('admin/dashboard');
            //   } 

            //   if (!loggedInUser && toState.data.isAuthenticate) { 
            //       //event.preventDefault();
            //       $location.path('/');
            //   } 


        });
    }]);

    angular.module('myApp').constant('appConstant', {
        'apiUrl': window.location.protocol + "//" + window.location.host + "/",
        'baseUrl': window.location.protocol + "//" + window.location.host + "/"
    });
})();
