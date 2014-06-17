articleContrl.controller('PostEditController', [
        '$scope', '$routeParams', '$location', '$filter', '$modal', 'postService',
        function ($scope, $routeParams, $location, $filter, $modal, postService) {
            getPost();

            function getPost() {
                postService.GetPost($routeParams.id)
                    .then(function (response) {
                        response.Created = $filter('DateToShortISOWithMonthName')(response.Created);
                        $scope.item = response;
                    },
                    function (errorMessage) {
                        $scope.error = errorMessage;
                    });
            };

            function addMediaList(mediaList) {
                postService.AddMediaListForPost(mediaList, $routeParams.id)
                    .then(function (response) {
                        getPost();
                    },
                    function (errorMessage) {
                        $scope.error = errorMessage;
                    });
            };

            function addMedia(media) {
                postService.AddMediaForPost(media, $routeParams.id)
                    .then(function (response) {
                        getPost();
                    },
                    function (errorMessage) {
                        $scope.error = errorMessage;
                    });
            };

            $scope.removeMediaForPost = function () {
                var retVal = confirm("Vill du ta visningsbilden?");
                if (retVal) {
                    postService.RemoveMediaForPost($routeParams.id)
                        .then(function(response) {
                                getPost();
                            },
                            function(errorMessage) {
                                $scope.error = errorMessage;
                            });
                }
            };

            $scope.removeMediaListForPost = function (mediaId) {
                var retVal = confirm("Vill du ta bort vald media?");
                if (retVal) {
                    postService.RemoveMediaForPost(mediaId, $routeParams.id)
                        .then(function(response) {
                                getPost();
                            },
                            function(errorMessage) {
                                $scope.error = errorMessage;
                            });
                }
            };

            $scope.onClickUpdatePost = function (item) {

                if (item.Created == "" || item.Created == null)
                    item.Created = null;
                else
                    item.Created = $filter('DateToShortISOWithMonthName')(item.Created);

                postService.UpdatePost(item)
                    .then(function (response) {
                        console.log(response);
                    },
                    function (errorMessage) {
                        $scope.error = errorMessage;
                    });
            };

            $scope.addMediaFromLibrary = function () {
                var modalInstance = $modal.open({
                    templateUrl: '../../AngularJs/partials/manage/addMedia.htm',
                    controller: 'addMediaController'
                });
                modalInstance.result.then(function (media) {
                    addMedia(media);
                }, function () {
                });
            };

            $scope.addMediaListFromLibrary = function () {
                var modalInstance = $modal.open({
                    templateUrl: '../../AngularJs/partials/manage/addMediaList.htm',
                    controller: 'addMediaListController'
                });
                modalInstance.result.then(function (mediaList) {
                    addMediaList(mediaList);
                }, function () {
                });
            };

        }]);