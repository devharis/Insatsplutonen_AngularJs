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

            $scope.onClickUpdatePost = function (item) {

                if (item.Created == "" || item.Created == null)
                    item.Created = null;
                else
                    item.Created = $filter('DateToShortISOWithMonthName')(item.Created);

                postService.updatePost(item)
                    .then(function (response) {
                        console.log(response);
                    },
                    function (errorMessage) {
                        $scope.error = errorMessage;
                    });
            };

            $scope.addImagesFromLibrary = function() {
                var modalInstance = $modal.open({
                    templateUrl: '../../AngularJs/partials/manage/addMedia.htm',
                    controller: 'addMediaController'
                });
                modalInstance.result.then(function () {
                }, function () {
                });
            };

        }]);