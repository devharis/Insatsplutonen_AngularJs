var mediaContrl = angular.module('app.controller', ['textAngular', 'angularFileUpload', 'ui.bootstrap'])
    .controller('MediaController', ['$scope', '$routeParams', '$location', '$modal', 'mediaService',
        function ($scope, $routeParams, $location, $modal, mediaService) {
            init();
            function init() {
                $scope.take = $routeParams.take || 10;
                $scope.page = $routeParams.page || 1;
                $scope.searchtext = $routeParams.search || "";
                $scope.ascending = $routeParams.ascending || false;
                $scope.sortby = $routeParams.sortby || "default";
                $scope.selectAllMedia = false;
                $scope.selectedMedia = [];
                getMedia(true);
            }

            function getMedia(reloadPage) {
                mediaService.GetPaginatedMedia($scope.take, $scope.page, $scope.searchtext, $scope.ascending, $scope.sortby)
                    .then(function (response) {
                        $scope.items = response;

                        angular.forEach(response.Data, function (item) {
                            // Converts Date
                            var date = new Date(parseInt(item.Created.substr(6)));
                            item.Created = date.toDateString("YYYY-MM-DD");
                            item.isSelected = false;
                            // Sets mediatype
                            var stringArr = item.File.split('.');
                            item.mediaType = stringArr[stringArr.length - 1].toUpperCase();
                        });

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
                $location.search({ take: $scope.take, page: $scope.page, search: $scope.searchtext, ascending: $scope.ascending, sortby: $scope.sortby });
            }

            $scope.onClickSelectAll = function (selectAll) {
                if (!selectAll) {
                    $scope.selectedMedia = [];
                    angular.forEach($scope.items.Data, function (item) {
                        $scope.selectedMedia.push({ "Id": item.Id });
                        item.isSelected = true;
                    });
                }
                else {
                    $scope.selectedMedia = [];
                    angular.forEach($scope.items.Data, function (item) {
                        item.isSelected = false;
                    });
                }
            };

            $scope.takeChange = function () {
                $scope.page = 1;
                updateLocation();
                getMedia(true);
            };

            $scope.pageChange = function () {
                updateLocation();
                getMedia(false);
            };

            $scope.searchChange = function () {
                $scope.page = 1;
                updateLocation();
                getMedia(true);
            };

            $scope.ascendingChange = function () {
                $scope.page = 1;
                $scope.sortby = "default";
                updateLocation();
                getMedia(true);
            }

            $scope.sortbyChange = function () {
                $scope.page = 1;
                $scope.ascending = false;
                updateLocation();
                getMedia(true);
            }

            $scope.onClickAttach = function (mediaId) {
                var isContained = false;
                angular.forEach($scope.selectedMedia, function (item) {
                    if (item.Id == mediaId)
                        isContained = true;
                });
                if (!isContained)
                    $scope.selectedMedia.push({ "Id": mediaId });

                var modalInstance = $modal.open({
                    templateUrl: '../../AngularJs/partials/media/attach.htm',
                    controller: 'attachController',
                    resolve: {
                        selectedMedia: function () {
                            return $scope.selectedMedia;
                        },
                        categories: function (mediaService) {
                            return mediaService.GetCategories();
                        }
                    }
                });
                modalInstance.result.then(function () {
                    getMedia(true);
                    $scope.selectedMedia = [];
                    $scope.selectAllMedia = false;
                }, function () {
                });
            };

            $scope.onClickView = function (media) {
                var modalInstance = $modal.open({
                    templateUrl: '../../AngularJs/partials/media/view.htm',
                    controller: 'ViewMediaController',
                    resolve: {
                        media: function () {
                            return media;
                        }
                    }
                });
                modalInstance.result.then(function () {
                    updateLocation();
                    getMedia(false);
                }, function () {
                    //close
                });
            };

            $scope.onClickAddCategory = function () {
                var modalInstance = $modal.open({
                    templateUrl: '../../AngularJs/partials/common/addCategory.htm',
                    controller: 'addCategoryController',
                    resolve: {
                        categories: function (mediaService) {
                            return mediaService.GetCategories();
                        }
                    }
                });
                modalInstance.result.then(function () {
                }, function () {
                });
            };

            $scope.onClickUploadFiles = function () {
                var modalInstance = $modal.open({
                    templateUrl: '../../AngularJs/partials/common/uploadFiles.htm',
                    controller: 'uploadFilesController'
                });
                modalInstance.result.then(function () {
                    //Success
                    $scope.page = 1;
                    getMedia(true);
                }, function () {
                    //Success
                    $scope.page = 1;
                    getMedia(true);
                });
            };

            $scope.onClickDeleteMedia = function (mediaId) {
                mediaService.DeleteMedia(mediaId)
                    .then(function (response) {
                        //Success
                        getMedia(true);
                    },
                    function (errorMessage) {
                        $scope.error = errorMessage;
                    });  
            };

            $scope.addToSelectMedia = function (mediaId) {
                var isContained = true;
                angular.forEach($scope.selectedMedia, function (item, index) {
                    if (item.Id == mediaId) {
                        $scope.selectedMedia.splice(index, 1);
                        isContained = false;
                    }
                });
                if (isContained) {
                    $scope.selectedMedia.push({ "Id": mediaId });
                }
            }

            $scope.onClickEdit = function (id) {
                id = (parseInt(id));
                $location.url('/edit/' + id);
            };

        }]);