articleContrl.controller('addMediaController', ['$scope', '$modalInstance', 'postService',
        function ($scope, $modalInstance, postService) {
            init();

            function init() {
                $scope.searchtext = "";
                $scope.category = -1;
                $scope.selectAllMedia = false;
                $scope.selectedMedia = [];

                getCategories();
                getMedia();
            };

            function getCategories() {
                postService.GetCategories()
                    .then(function (response) {
                        response.unshift({
                            "Id": 0,
                            "Title": "Alla"
                        });
                        response.unshift({
                            "Id": -1,
                            "Title": "Senaste"
                        });
                        $scope.categoryList = response;
                    },
                    function (errorMessage) {
                        $scope.error = errorMessage;
                    });
            };

            function getMedia() {
                postService.GetMediaByCategory($scope.category)
                    .then(function (response) {
                        $scope.mediaList = response;
                    },
                    function (errorMessage) {
                        $scope.error = errorMessage;
                    });
            };

            $scope.addToSelectMedia = function (media) {
                $scope.selectedMedia = [];
                $scope.selectedMedia.push({ "Id": media.Id, "File": media.File });
            }

            $scope.onChangeCategory = function (id) {
                console.log(id);
                $scope.category = id;
                getMedia();
            };

            $scope.ok = function (mediaList) {
                $modalInstance.close(mediaList);
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }]);