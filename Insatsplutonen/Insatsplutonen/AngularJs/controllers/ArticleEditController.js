articleContrl.controller('ArticleEditController', [
        '$scope', '$routeParams', '$location', '$fileUploader', 'articleService',
        function ($scope, $routeParams, $location, $fileUploader, articleService) {
            getArticle();

            function getArticle() {
                articleService.GetArticle($routeParams.id)
                    .then(function (response) {
                        var date = new Date(parseInt(response.NewsDate.substr(6)));
                        response.NewsDate = date.toDateString("YYYY-MM-DD");
                        $scope.item = response;
                    },
                    function (errorMessage) {
                        $scope.error = errorMessage;
                    });
            };

            // Creates a uploader
            var uploader = $scope.uploader = $fileUploader.create({
                scope: $scope,
                url: '/Blog/Index'
            });

            // ADDING FILTERS

            // Images only
            uploader.filters.push(function (item /*{File|HTMLInputElement}*/) {
                console.log(item);
                var type = uploader.isHTML5 ? item.type : '/' + item.value.slice(item.value.lastIndexOf('.') + 1);
                type = '|' + type.toLowerCase().slice(type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            });


            // REGISTER HANDLERS

            uploader.bind('afteraddingfile', function (event, item) {
                console.info('After adding a file', item);
            });

            uploader.bind('whenaddingfilefailed', function (event, item) {
                console.info('When adding a file failed', item);
            });

            uploader.bind('afteraddingall', function (event, items) {
                console.info('After adding all files', items);
            });

            uploader.bind('beforeupload', function (event, item) {
                console.info('Before upload', item);
            });

            uploader.bind('progress', function (event, item, progress) {
                console.info('Progress: ' + progress, item);
            });

            uploader.bind('success', function (event, xhr, item, response) {
                console.info('Success', xhr, item, response);
            });

            uploader.bind('cancel', function (event, xhr, item) {
                console.info('Cancel', xhr, item);
            });

            uploader.bind('error', function (event, xhr, item, response) {
                console.info('Error', xhr, item, response);
            });

            uploader.bind('complete', function (event, xhr, item, response) {
                console.info('Complete', xhr, item, response);
            });

            uploader.bind('progressall', function (event, progress) {
                console.info('Total progress: ' + progress);
            });

            uploader.bind('completeall', function (event, items) {
                console.info('Complete all', items);
            });

        }]);