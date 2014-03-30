var articleContrl = angular.module('app.controller', ['textAngular'])
    .controller('ArticlesController', [
        '$scope', '$routeParams', '$location', 'articleService',
        function ($scope, $routeParams, $location, articleService) {

            $scope.take = $routeParams.take || 10;
            $scope.page = $routeParams.page || 1;
            $scope.searchtext = $routeParams.search || "";
            $scope.ascending = $routeParams.ascending || false;
            $scope.sortby = $routeParams.sortby || "default";

            getArticles(true);

            function getArticles(reloadPage) {

                articleService.GetPaginatedArticles($scope.take, $scope.page, $scope.searchtext, $scope.ascending, $scope.sortby)
                    .then(function (response) {                
                        $scope.items = response;

                        angular.forEach(response.Articles, function (item) {
                            var date = new Date(parseInt(item.NewsDate.substr(6)));
                            item.NewsDate = date.toDateString("YYYY-MM-DD");
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

            $scope.takeChange = function() {
                $scope.page = 1;
                updateLocation();
                getArticles(true);
            };
            $scope.pageChange = function () {
                updateLocation();
                getArticles(false);
            };
            $scope.searchChange = function () {
                $scope.page = 1;
                updateLocation();
                getArticles(true);
            };
            $scope.ascendingChange = function () {
                $scope.page = 1;
                $scope.sortby = "default";
                updateLocation();
                getArticles(true);
            }
            $scope.sortbyChange = function () {
                $scope.page = 1;
                $scope.ascending = false;
                updateLocation();
                getArticles(true);
            }
            $scope.articleClick = function (articleId) {
                articleId = (parseInt(articleId));
                $location.url('/article/' + articleId);
            };

        }]);