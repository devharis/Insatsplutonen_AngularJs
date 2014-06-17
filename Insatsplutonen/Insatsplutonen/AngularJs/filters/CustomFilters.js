var customFilters = angular.module('app.filter', []);

customFilters.filter('dateToISO', function () {
    return function (dateString) {
        return moment(dateString).format('YYYY-MM-DD, HH:mm:ss');
    };
});

customFilters.filter('dateToISOShort', function () {
    return function (dateString) {
        return moment(dateString).format('MMM YYYY');
    };
});

customFilters.filter('DateToShortISOWithMonthName', function () {
    return function (dateString) {
        return moment(dateString).format('DD-MMMM-YYYY');
    };
});
customFilters.filter('DateToDay', function () {
    return function (dateString) {
        return moment(dateString).format('DD');
    };
});
customFilters.filter('DateToMonth', function () {
    return function (dateString) {
        return moment(dateString).format('MMM');
    };
});
customFilters.filter('DateToYear', function () {
    return function (dateString) {
        return moment(dateString).format('YYYY');
    };
});