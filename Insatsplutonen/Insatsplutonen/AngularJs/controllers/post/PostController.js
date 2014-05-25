articleContrl.controller('PostController', [
        '$scope', '$routeParams', '$location', '$filter', 'postService',
        function ($scope, $routeParams, $location, $filter, postService) {
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
            $scope.editPostClick = function (id) {
                id = (parseInt(id));
                $location.url('/edit/' + id);
            };

        }]);