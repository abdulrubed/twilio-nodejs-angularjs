!(function() {
    'use strict';
    angular.module('myApp').controller('AuthController', ['$scope', 'UtilityService', function($scope, UtilityService) {

        $scope.messageFormObj = { phone_number: '', message: '' };
        $scope.sendMessage = function sendMessage() {
            if ($scope.messageForm.$valid) {
                $scope.messageSendBtn = true;
                UtilityService.apiPost('users/send_message', $scope.messageFormObj)
                    .then(function(response) {
                    	UtilityService.showToast('info', 'Message Successfully Sent.');
                        $scope.messageFormObj = {};
                        $scope.messageForm.$setPristine();
                        $scope.messageForm.$setUntouched();
                        $scope.messageSendBtn = false;
                    }, function(error) {
                        $scope.messageSendBtn = false;
                        UtilityService.showToast('error', 'Something went wrong.');
                    });
            }
        };
    }]);
})();
