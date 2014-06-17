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

        this.NewPost = function () {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/Manage/NewPost',
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function () {
                deferred.reject("An error occured while fetching data");
            });

            return deferred.promise;
        };

        this.CreatePost = function (post) {
            console.log(post);
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: '/Manage/Create',
                data: post,
                dataType: "json",
                headers: { 'Content-Type': 'application/json' }
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function () {
                deferred.reject("An error occured while fetching data");
            });

            return deferred.promise;
        };

        this.UpdatePost = function (post) {
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

        this.AddMediaListForPost = function (mediaList, postId) {
            var deferred = $q.defer();
            $http({
                method: "POST",
                url: '/Manage/AddMediaListForPost',
                params: {
                    mediaListJson: JSON.stringify(mediaList),
                    postId: postId
                },
                dataType: "json"
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function () {
                deferred.reject("An error occured while fetching data");
            });

            return deferred.promise;
        };

        this.AddMediaForPost = function (media, postId) {
            var deferred = $q.defer();
            $http({
                method: "POST",
                url: '/Manage/AddMediaForPost',
                params: {
                    mediaJson: media,
                    postId: postId
                },
                dataType: "json"
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function () {
                deferred.reject("An error occured while fetching data");
            });

            return deferred.promise;
        };

        this.RemoveMediaForPost = function (postId) {
            var deferred = $q.defer();
            $http({
                method: "DELETE",
                url: '/Manage/RemoveMediaForPost',
                params: {
                    postId: postId
                },
                dataType: "json"
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function () {
                deferred.reject("An error occured while fetching data");
            });

            return deferred.promise;
        };

        this.RemoveMediaForPost = function (mediaId, postId) {
            var deferred = $q.defer();
            $http({
                method: "DELETE",
                url: '/Manage/RemoveMediaListForPost',
                params: {
                    mediaId: mediaId,
                    postId: postId
                },
                dataType: "json"
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function () {
                deferred.reject("An error occured while fetching data");
            });

            return deferred.promise;
        };

        this.DeletePost = function (postId) {
            var deferred = $q.defer();
            $http({
                method: "DELETE",
                url: '/Manage/DeletePost',
                params: {
                    postId: postId
                },
                dataType: "json"
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function () {
                deferred.reject("An error occured while fetching data");
            });

            return deferred.promise;
        };
        
    }]);