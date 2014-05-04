mediaContrl.controller('editMediaController', ['$scope', '$modalInstance', 'selectedMedia',
        function ($scope, $modalInstance, selectedMedia) {
            init();

            function init() {
                $scope.selectedMedia = selectedMedia;
            };

            $scope.ok = function () {
               
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }]);