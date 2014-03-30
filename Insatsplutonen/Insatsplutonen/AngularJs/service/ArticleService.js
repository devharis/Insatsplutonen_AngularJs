var articleService = angular.module('app.service', [])
    .service('articleService', ['$http', '$q', function ($http, $q) {

        this.GetPaginatedArticles = function (take, page, search, ascending, sortby) {
            var deferred = $q.defer();
            $http({
                type: 'GET',
                url: '/Blog/GetPaginatedArticles',
                params: {
                    take: take,
                    page: page,
                    search: search,
                    ascending: ascending,
                    sortby: sortby
                },
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function () {
                deferred.reject("An error occured while fetching data");
            });

            return deferred.promise;
        },
        this.GetArticle = function (articleId) {
            var deferred = $q.defer();
            $http({
                type: 'GET',
                url: '/Blog/GetArticle',
                params: {
                    articleId: articleId
                },
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function () {
                deferred.reject("An error occured while fetching data");
            });

            return deferred.promise;
        };
    }]);