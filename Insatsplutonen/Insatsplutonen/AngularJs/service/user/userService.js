userApp.service('userService', ['$http', '$q', function ($http, $q) {
    this.GetPaginatedUsers = function (take, page, search) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: '/Account/GetPaginatedUsers',
            params: {
                take: take,
                page: page,
                search: search,
            },
            headers: { 'Content-Type': 'application/json' }
        }).success(function (data) {
            deferred.resolve(data);
        }).error(function () {
            deferred.reject("An error occured while fetching data");
        });

        return deferred.promise;
    },
    this.GetUser = function (id) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: '/Account/GetUser',
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

    this.DeleteUser = function (id) {
        var deferred = $q.defer();
        $http({
            method: 'DELETE',
            url: '/Account/DeleteUser',
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

    this.UpdateUser = function (user) {
        var deferred = $q.defer();
        $http({
            method: "POST",
            url: '/Account/UpdateUser',
            params: {
                userJson: JSON.stringify(user)
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