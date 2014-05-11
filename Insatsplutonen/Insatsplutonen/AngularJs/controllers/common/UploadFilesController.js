var addCategoryCntrl = angular.module('app.common')
    .controller('uploadFilesController', ['$scope', '$modalInstance', '$fileUploader', 'mediaService',
        function ($scope, $modalInstance, $fileUploader, mediaService) {
            // Creates a uploader
            var uploader = $scope.uploader = $fileUploader.create({
                scope: $scope,
                method: 'POST',
                url: '/Media/SaveImage'
            });

            init();

            function init() {
                $scope.fileList = [];
                $scope.uploadView = false;
                $scope.fileDetailView = true;
            };

            $scope.ok = function () {
                $modalInstance.close();
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

            $scope.saveFileList = function (fileList) {
                mediaService.UpdateMediaList(fileList)
                    .then(function (response) {

                    },
                    function (errorMessage) {
                        $scope.error = errorMessage;
                    });
            };

            $scope.showFileDetailView = function () {
                $scope.uploadView = true;
                $scope.fileDetailView = false;
            };

            $scope.showUploadView = function () {
                $scope.uploadView = false;
                $scope.fileDetailView = true;
            };

            // ADDING FILTERS

            // Images only
            uploader.filters.push(function (item /*{File|HTMLInputElement}*/) {
                var type = uploader.isHTML5 ? item.type : '/' + item.value.slice(item.value.lastIndexOf('.') + 1);
                type = '|' + type.toLowerCase().slice(type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            });

            // REGISTER HANDLERS

            //uploader.bind('afteraddingfile', function (event, item) {
            //    console.info('After adding a file', item);
            //});

            //uploader.bind('whenaddingfilefailed', function (event, item) {
            //    console.info('When adding a file failed', item);
            //});

            //uploader.bind('afteraddingall', function (event, items) {
            //    console.info('After adding all files', items);
            //    $scope.fileList = items;
            //});

            //uploader.bind('beforeupload', function (event, item) {
            //    console.info('Before upload', item);
            //});

            //uploader.bind('progress', function (event, item, progress) {
            //    console.info('Progress: ' + progress, item);
            //});

            uploader.bind('success', function (event, xhr, item, response) {
                console.info('Success', xhr, item, response);

                $scope.fileList.push(response);

            });

            //uploader.bind('cancel', function (event, xhr, item) {
            //    console.info('Cancel', xhr, item);
            //});

            //uploader.bind('error', function (event, xhr, item, response) {
            //    console.info('Error', xhr, item, response);
            //});

            uploader.bind('complete', function (event, xhr, item, response) {
                console.log(response);
            });

            //uploader.bind('progressall', function (event, progress) {
            //    console.info('Total progress: ' + progress);
            //});

            uploader.bind('completeall', function (event, items) {

            });
        }]);