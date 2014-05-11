articleContrl.controller('PostEditController', [
        '$scope', '$routeParams', '$location', 'postService',
        function ($scope, $routeParams, $location, postService) {
            getPost();

            function getPost() {
                postService.GetPost($routeParams.id)
                    .then(function (response) {
                        var date = new Date(parseInt(response.Created.substr(6)));
                        response.Created = date.toDateString("YYYY-MM-DD");
                        $scope.item = response;
                    },
                    function (errorMessage) {
                        $scope.error = errorMessage;
                    });
            };

            $scope.onClickUpdatePost = function (item) {
                postService.updatePost(item)
                    .then(function (response) {
                        console.log(response);
                    },
                    function (errorMessage) {
                        $scope.error = errorMessage;
                    });
            };

        }]);