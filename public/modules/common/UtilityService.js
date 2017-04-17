!(function() {
    'use strict';
    angular.module('myApp').service('UtilityService', ['$http', function($http) {
        this.apiPost = function(url, data) {
            return $http.post('http://localhost:2149/api/' + url, data);
        };
        /* Remove range slider */
        this.removeToast = function() {
            toastr.remove();
        };

        /* service to set toaster */
        this.showToast = function(type, message) {
            toastr.options = {
                "closeButton": true,
                "positionClass": "toast-top-right",
                "preventDuplicates": true,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "8000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            };
            //toastr.remove();
            toastr[type](message);

        };
    }]);
})();
