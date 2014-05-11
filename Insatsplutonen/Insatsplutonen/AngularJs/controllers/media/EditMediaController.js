mediaContrl.controller('EditMediaController', ['$scope', '$routeParams', 'mediaService',
        function ($scope, $routeParams, mediaService) {
            init();

            function init() {
                mediaService.GetMedia($routeParams.id)
                    .then(function (response) {
                        $scope.media = response;
                    },
                    function (errorMessage) {
                        $scope.error = errorMessage;
                    });
            };

            $scope.onClickUpdateMedia = function(updatedMedia) {
                mediaService.UpdateMedia(updatedMedia)
                    .then(function(response) {
                            init();
                        },
                        function(errorMessage) {
                            $scope.error = errorMessage;
                        });
            };

            $scope.ok = function () {

            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }]);