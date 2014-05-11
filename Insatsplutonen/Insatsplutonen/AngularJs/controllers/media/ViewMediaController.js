mediaContrl.controller('ViewMediaController', ['$scope', '$routeParams', 'media',
        function ($scope, $routeParams, media) {
            init();

            function init() {
                $scope.media = media;
            };


            $scope.ok = function () {

            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }]);