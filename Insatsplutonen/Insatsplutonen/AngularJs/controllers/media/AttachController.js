mediaContrl.controller('attachController', ['$scope', '$modalInstance', 'selectedMedia', 'categories', 'mediaService',
        function ($scope, $modalInstance, selectedMedia, categories, mediaService) {
            init();

            function init() {
                $scope.searchtext = "";
                $scope.categories = categories;
                $scope.selectedCategory = {
                    value: ""
                };
            };

            $scope.ok = function () {
                mediaService.UpdateMediaCategory(selectedMedia, $scope.selectedCategory.value)
                    .then(function (response) {
                        
                    },
                    function (errorMessage) {
                        $scope.error = errorMessage;
                    });
                $modalInstance.close();
            };
            $scope.cancel = function (selectedCategory) {
                $modalInstance.dismiss('cancel');
            };
        }]);