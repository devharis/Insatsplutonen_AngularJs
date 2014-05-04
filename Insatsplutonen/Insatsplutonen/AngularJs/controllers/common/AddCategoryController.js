var addCategoryCntrl = angular.module('app.common', ['ui.bootstrap'])
    .controller('addCategoryController', ['$scope', '$modalInstance', 'categories', 'mediaService',
        function ($scope, $modalInstance, categories, mediaService) {
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