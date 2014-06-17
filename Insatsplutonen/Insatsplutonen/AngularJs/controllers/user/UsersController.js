userApp.controller('UsersCtrl', ['$scope', '$routeParams', '$location', 'userService',
        function ($scope, $routeParams, $location, userService) {

            $scope.take = $routeParams.take || 10;
            $scope.page = $routeParams.page || 1;
            $scope.searchtext = $routeParams.search || "";

            getUsers(true);

            function getUsers(reloadPage) {
                userService.GetPaginatedUsers($scope.take, $scope.page, $scope.searchtext)
                    .then(function (response) {
                        $scope.items = response;
                        console.log(response);
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
                $location.search({ take: $scope.take, page: $scope.page, search: $scope.searchtext });
            }

            $scope.deleteUserClick = function (postId) {
                var retVal = confirm("Vill du ta bort nyheten?");
                if (retVal) {
                    userService.DeleteUser(postId)
                       .then(function (response) {
                           getUsers();
                       },
                       function (errorMessage) {
                           $scope.error = errorMessage;
                       });
                }
            }

            $scope.takeChange = function () {
                $scope.page = 1;
                updateLocation();
                getUsers(true);
            };

            $scope.pageChange = function () {
                updateLocation();
                getUsers(false);
            };

            $scope.searchChange = function () {
                $scope.page = 1;
                updateLocation();
                getUsers(true);
            };

            $scope.postClick = function (id) {
                id = (parseInt(id));
                $location.url('/' + id);
            };

        }]);