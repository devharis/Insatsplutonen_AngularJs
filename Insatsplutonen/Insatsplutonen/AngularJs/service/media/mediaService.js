var mediaService = angular.module('app.service', [])
    .service('mediaService', ['$http', '$q', function ($http, $q) {

    this.GetPaginatedMedia = function(take, page, search, ascending, sortby) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: '/Media/GetPaginatedMedia',
            params: {
                take: take,
                page: page,
                search: search,
                ascending: ascending,
                sortby: sortby
            },
            headers: { 'Content-Type': 'application/json' }
        }).success(function(data) {
            deferred.resolve(data);
        }).error(function() {
            deferred.reject("An error occured while fetching data");
        });

        return deferred.promise;
    };

    this.GetMedia = function (id) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: '/Media/GetMedia',
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

    this.UpdateMediaCategory = function (mediaList, categoryId) {
        var deferred = $q.defer();
        $http({
            method: 'PUT',
            url: '/Media/UpdateMediaCategory',
            params: {
                mediaList: JSON.stringify(mediaList),
                categoryId: categoryId
            },
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            deferred.resolve(data);
        }).error(function () {
            deferred.reject("An error occured while fetching data");
        });

        return deferred.promise;
    };

    this.AddCategory = function (category) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: '/Media/AddCategory',
            params: {
                category: JSON.stringify(category)
            },
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            deferred.resolve(data);
        }).error(function () {
            deferred.reject("An error occured while fetching data");
        });

        return deferred.promise;
    };

    this.DeleteCategory = function (id) {
        var deferred = $q.defer();
        $http({
            method: 'DELETE',
            url: '/Media/DeleteCategory',
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

    this.UpdateMediaList = function (mediaList) {
        var deferred = $q.defer();
        $http({
            method: 'PUT',
            url: '/Media/UpdateMediaList',
            params: {
                mediaList: JSON.stringify(mediaList)
            },
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            deferred.resolve(data);
        }).error(function () {
            deferred.reject("An error occured while fetching data");
        });

        return deferred.promise;
    };

    this.DeleteMedia = function (id) {
        var deferred = $q.defer();
        $http({
            method: 'DELETE',
            url: '/Media/DeleteMedia',
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

    this.UpdateMedia = function (media) {
        var deferred = $q.defer();
        $http({
            method: 'PUT',
            url: '/Media/UpdateMedia',
            params: {
                media: JSON.stringify(media)
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