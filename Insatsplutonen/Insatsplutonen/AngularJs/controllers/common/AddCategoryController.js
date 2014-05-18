var addCategoryCntrl = angular.module('app.common', ['ui.bootstrap'])
    .controller('addCategoryController', ['$scope', '$modalInstance', 'categories', 'mediaService',
        function ($scope, $modalInstance, categories, mediaService) {
            init();

            function init() {
                $scope.searchtext = "";
                angular.forEach(categories, function (item) {
                    // Converts Date
                    var date = new Date(parseInt(item.Created.substr(6)));
                    item.Created = date.toDateString("YYYY-MM-DD");
                });
                $scope.categories = categories;

                $scope.category = {
                    "Title": "",
                    "Description": ""
                };
            };

            function getCategories() {
                mediaService.GetCategories()
                    .then(function (response) {
                        $scope.categories = response;
                        angular.forEach($scope.categories, function (item) {
                            // Converts Date
                            var date = new Date(parseInt(item.Created.substr(6)));
                            item.Created = date.toDateString("YYYY-MM-DD");
                        });

                    },
                    function (errorMessage) {
                        $scope.error = errorMessage;
                    });
            };

            $scope.addCategory = function (category) {
                mediaService.AddCategory(category)
                    .then(function (response) {
                        $scope.category = {
                            "Title": "",
                            "Description": ""
                        };
                        getCategories();
                    },
                    function (errorMessage) {
                        $scope.error = errorMessage;
                    });
            };

            $scope.removeCategory = function (categoryId) {
                mediaService.DeleteCategory(categoryId)
                    .then(function (response) {
                        //Success
                        getCategories();
                    },
                    function (errorMessage) {
                        $scope.error = errorMessage;
                    });
            };

            $scope.ok = function () {
                $modalInstance.close();
            };

            $scope.cancel = function (selectedCategory) {
                $modalInstance.dismiss('cancel');
            };
        }]);