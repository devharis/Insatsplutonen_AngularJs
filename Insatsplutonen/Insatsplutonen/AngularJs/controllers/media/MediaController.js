var mediaContrl = angular.module('app.controller', ['textAngular', 'angularFileUpload', 'ui.bootstrap'])
    .controller('MediaController', ['$scope', '$routeParams', '$location', '$modal', 'mediaService',
        function ($scope, $routeParams, $location, $modal, mediaService) {

            $scope.take = $routeParams.take || 10;
            $scope.page = $routeParams.page || 1;
            $scope.searchtext = $routeParams.search || "";
            $scope.ascending = $routeParams.ascending || false;
            $scope.sortby = $routeParams.sortby || "default";
            $scope.selectedMedia = [];
            getMedia(true);

            function getMedia(reloadPage) {
                mediaService.GetPaginatedMedia($scope.take, $scope.page, $scope.searchtext, $scope.ascending, $scope.sortby)
                    .then(function (response) {
                        $scope.items = response;

                        angular.forEach(response.Data, function (item) {
                            // Converts Date
                            var date = new Date(parseInt(item.Created.substr(6)));
                            item.Created = date.toDateString("YYYY-MM-DD");

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
                    templateUrl: '../../AngularJs/partials/attach/attach.htm',
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
                }, function () {
                    //close
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
                console.log($scope.selectedMedia);
            }

            $scope.postClick = function (id) {
                id = (parseInt(id));
                $location.url('/' + id);
            };

        }]);