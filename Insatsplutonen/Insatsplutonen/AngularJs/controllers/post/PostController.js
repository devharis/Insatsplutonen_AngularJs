appBlog.controller('PostController', ['$scope', '$routeParams', '$location', '$filter', 'postService',
        function ($scope, $routeParams, $location, $filter, postService) {
            getPost();

            function getPost() {

                postService.GetPost($routeParams.id)
                    .then(function (response) {
                        var date = new Date(parseInt(response.Created.substr(6)));
                        response.Created = date.toDateString("YYYY-MM-DD");
                        response.day = $filter('DateToDay')(date);
                        response.month = $filter('DateToMonth')(date);
                        response.year = $filter('DateToYear')(date);
                        $scope.item = response;

                        $scope.myInterval = 8000;
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