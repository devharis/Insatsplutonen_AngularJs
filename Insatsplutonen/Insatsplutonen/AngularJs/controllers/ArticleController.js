articleContrl.controller('ArticleController', [
        '$scope', '$routeParams', '$location', 'articleService',
        function ($scope, $routeParams, $location, articleService) {
            getArticle();

            function getArticle() {

                articleService.GetArticle($routeParams.id)
                    .then(function (response) {
                        var date = new Date(parseInt(response.NewsDate.substr(6)));
                        response.NewsDate = date.toDateString("YYYY-MM-DD");

                        console.log(response);
                        $scope.item = response;
                    },
                    function (errorMessage) {
                        $scope.error = errorMessage;
                    });
            };
            $scope.editArticleClick = function (articleId) {
                articleId = (parseInt(articleId));
                $location.url('/article/edit/' + articleId);
            };

        }]);