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

            $scope.addToSelectMedia = function (mediaId) {
                var isContained = true;
                angular.forEach($scope.selectedMedia, function (item, index) {
                    if (item.Id == mediaId) {
                        $scope.selectedMedia.splice(index, 1);
                        isContained = false;
                    }
                });
                if (isContained) {
                    $scope.selectedMedia.push({ "Id": mediaId });
                }
            }

            $scope.onChangeCategory = function (id) {
                console.log(id);
                $scope.category = id;
                getMedia();
            };

            $scope.ok = function (mediaList) {
                console.log(mediaList);
                $modalInstance.close();
            };

            $scope.cancel = function (selectedCategory) {
                $modalInstance.dismiss('cancel');
            };
        }]);