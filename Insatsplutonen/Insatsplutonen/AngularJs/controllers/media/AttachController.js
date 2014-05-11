mediaContrl.controller('attachController', ['$scope', '$modalInstance', 'selectedMedia', 'categories', 'mediaService',
        function ($scope, $modalInstance, selectedMedia, categories, mediaService) {
            init();

            function init() {
                $scope.searchtext = "";
                angular.forEach(categories, function (item) {
                    // Converts Date
                    var date = new Date(parseInt(item.Created.substr(6)));
                    item.Created = date.toDateString("YYYY-MM-DD");
                });
                $scope.categories = categories;
                $scope.selectedCategory = {
                    value: ""
                };
            };

            $scope.ok = function () {
                mediaService.UpdateMediaCategory(selectedMedia, $scope.selectedCategory.value)
                    .then(function (response) {
                        $modalInstance.close();
                    },
                    function (errorMessage) {
                        $scope.error = errorMessage;
                    });
            };
            $scope.cancel = function (selectedCategory) {
                $modalInstance.dismiss('cancel');
            };
        }]);