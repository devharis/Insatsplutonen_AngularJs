userApp.controller('UserEditCtrl', ['$scope', '$routeParams', '$filter', 'userService',
        function ($scope, $routeParams, $filter, userService) {
            getUser();

            function getUser() {
                userService.GetUser($routeParams.id)
                    .then(function (response) {
                        $scope.item = response;
                    },
                    function (errorMessage) {
                        $scope.error = errorMessage;
                    });
            };

            $scope.onClickUpdateUser = function (item) {
                userService.UpdateUser(item)
                    .then(function (response) {
                        console.log(response);
                    },
                    function (errorMessage) {
                        $scope.error = errorMessage;
                    });
            };

        }]);