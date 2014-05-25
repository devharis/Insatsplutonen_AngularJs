var articleService = angular.module('app.service', [])
    .service('postService', ['$http', '$q', function ($http, $q) {

        this.GetPaginatedPosts = function (take, page, search, ascending, sortby) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/Manage/GetPaginatedPosts',
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

        this.GetPost = function (id) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/Manage/GetPost',
                params: {
                    id: id
                },
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function () {
                deferred.reject("An error occured while fetching data");
            });

            return deferred.promise;
        };

        this.updatePost = function (post) {
            var deferred = $q.defer();
            $http({
                method: "POST",
                url: '/Manage/UpdatePost',
                params: {
                    postJson: JSON.stringify(post)
                },
                dataType: "json"
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function () {
                deferred.reject("An error occured while fetching data");
            });

            return deferred.promise;
        };

        this.GetCategories = function () {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/Media/GetCategories',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function () {
                deferred.reject("An error occured while fetching data");
            });

            return deferred.promise;
        };

        this.GetMediaByCategory = function (category) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/Media/GetMediaByCategory',
                params: {
                    id: category
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