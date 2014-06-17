articleContrl.controller('PostAddController', [
        '$scope', '$routeParams', '$location', '$filter', '$modal', 'postService',
        function ($scope, $routeParams, $location, $filter, $modal, postService) {
            getNewPost();

            function getNewPost() {
                postService.NewPost()
                    .then(function (response) {
                        response.Created = $filter('DateToShortISOWithMonthName')(Date.now());
                        $scope.item = response;
                    },
                    function (errorMessage) {
                        $scope.error = errorMessage;
                    });
            };

            $scope.removeMediaForPost = function (post) {
                post.Media = null;
                post.MediaId = null;
            };

            $scope.removeMediaListForPost = function (mediaId, post) {
                angular.forEach(post.MediaList, function (media, index) {
                    if (media.Id == mediaId)
                        post.MediaList.splice(index, 1);
                });
            };

            $scope.onClickCreatePost = function (item) {
                if (item.Created == "" || item.Created == null)
                    item.Created = null;
                else
                    item.Created = $filter('DateToShortISOWithMonthName')(item.Created);

                postService.CreatePost(item)
                    .then(function (response) {
                        console.log(response);
                    },
                    function (errorMessage) {
                        $scope.error = errorMessage;
                    });
            };

            $scope.addMediaFromLibrary = function (post) {
                var modalInstance = $modal.open({
                    templateUrl: '../../AngularJs/partials/manage/addMedia.htm',
                    controller: 'addMediaController'
                });
                modalInstance.result.then(function (media) {
                    post.Media = media[0].File;
                    post.MediaId = media[0].Id;
                }, function () {
                });
            };

            $scope.addMediaListFromLibrary = function (post) {
                var modalInstance = $modal.open({
                    templateUrl: '../../AngularJs/partials/manage/addMediaList.htm',
                    controller: 'addMediaListController'
                });
                modalInstance.result.then(function (mediaList) {
                    console.log(mediaList);
                    angular.forEach(mediaList, function(media) {
                        post.MediaList.push(media);
                    });
                }, function () {
                });
            };

        }]);