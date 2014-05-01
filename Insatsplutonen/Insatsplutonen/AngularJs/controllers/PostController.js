articleContrl.controller('PostController', [
        '$scope', '$routeParams', '$location', 'postService',
        function ($scope, $routeParams, $location, postService) {
            getPost();

            function getPost() {

                postService.GetPost($routeParams.id)
                    .then(function (response) {
                        var date = new Date(parseInt(response.Date.substr(6)));
                        response.Date = date.toDateString("YYYY-MM-DD");
                        $scope.item = response;
                    },
                    function (errorMessage) {
                        $scope.error = errorMessage;
                    });
            };
            $scope.editPostClick = function (id) {
                id = (parseInt(id));
                $location.url('/edit/' + id);
            };

        }]);