var articleContrl = angular.module('app.controller', ['textAngular', 'angularFileUpload'])
    .controller('PostsController', [
        '$scope', '$routeParams', '$location', '$sce', 'postService',
        function ($scope, $routeParams, $location, $sce, postService) {

            $scope.take = $routeParams.take || 10;
            $scope.page = $routeParams.page || 1;
            $scope.searchtext = $routeParams.search || "";
            $scope.ascending = $routeParams.ascending || false;
            $scope.sortby = $routeParams.sortby || "default";

            getPosts(true);

            function getPosts(reloadPage) {

                postService.GetPaginatedPosts($scope.take, $scope.page, $scope.searchtext, $scope.ascending, $scope.sortby)
                    .then(function (response) {                
                        $scope.items = response;
                        angular.forEach(response.Data, function (item) {
                            var date = new Date(parseInt(item.Created.substr(6)));
                            item.Created = date.toDateString("YYYY-MM-DD");
                        });

                        $scope.pagingarray = response.Pagingarray;
                        $scope.lastSizePage = response.Pagingarray[response.Pagingarray.length - 1];
                        $scope.firstSizePage = response.Pagingarray[0];

                        if (reloadPage)
                            $scope.page = $scope.pagingarray[$scope.page - 1];
                    },
                    function (errorMessage) {
                        $scope.error = errorMessage;
                    });
            };

            function updateLocation() {
                $location.search({ take: $scope.take, page: $scope.page, search: $scope.searchtext, ascending: $scope.ascending, sortby: $scope.sortby });
            }

            $scope.isTrusted = function (html) {
                return $sce.trustAsHtml(html);
            }

            $scope.takeChange = function() {
                $scope.page = 1;
                updateLocation();
                getPosts(true);
            };
            $scope.pageChange = function () {
                updateLocation();
                getPosts(false);
            };
            $scope.searchChange = function () {
                $scope.page = 1;
                updateLocation();
                getPosts(true);
            };
            $scope.ascendingChange = function () {
                $scope.page = 1;
                $scope.sortby = "default";
                updateLocation();
                getPosts(true);
            }
            $scope.sortbyChange = function () {
                $scope.page = 1;
                $scope.ascending = false;
                updateLocation();
                getPosts(true);
            }
            $scope.postClick = function (id) {
                id = (parseInt(id));
                $location.url('/' + id);
            };

        }]);