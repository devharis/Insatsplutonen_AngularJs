appBlog.service('postService', ['$http', '$q', function ($http, $q) {

        this.GetPaginatedPosts = function (take, page, search, ascending, sortby) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/Blog/GetPaginatedPosts',
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
                url: '/Blog/GetPost',
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
                url: '/Blog/UpdatePost',
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
    }]);