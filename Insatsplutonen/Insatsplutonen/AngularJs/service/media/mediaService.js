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
            method: 'GET',
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
    
}]);