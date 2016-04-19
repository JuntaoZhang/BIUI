(function () {
  'use strict';
  angular.module('BIUIApp')
    .controller('DomainsCtrl', ['$scope', '$http', 'ApiService', 'Utils',
      function ($scope, $http, ApiService, Utils) {
        $scope.displayed = [];
        $scope.startTime = Utils.getDateString(new Date().getTime() - 1000 * 3600 * 24);
        $scope.endTime = Utils.getDateString(new Date().getTime() - 1000 * 3600 * 24);
        $scope.searchDomain = '';

        function getStartTime() {
          return new Date($scope.startTime).getTime();
        }

        function getEndTime() {
          return new Date($scope.endTime).getTime();
        }

        $scope.isLoading = true;

        function _search() {
          if (!($scope.startTime && $scope.endTime)) {
            //TODO  alert 需要友好
            alert('请输入时间!');
            return;
          }
          if (getEndTime() < getStartTime()) {
            var t = getEndTime();
            $scope.endTime = Utils.getDateString(getStartTime());
            $scope.startTime = Utils.getDateString(t);
          }
          var data = {
            'startTime': getStartTime(),
            'endTime': getEndTime(),
            'searchDomain': $scope.searchDomain,
            'pageSize': 20
          };

          ApiService.getDomains(function (response) {
            $scope.displayed = [];
            $.each(response.data.results, function (index, row) {
              $scope.displayed.push({
                'domain': row[0],
                'number': row[1]
              });
            });
            $scope.isLoading = false;
          }, data);
        }

        _search();

        function open(before) {
          return function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            if (before) {
              $scope.isBeforeOpen = true;
            } else {
              $scope.isAfterOpen = true;
            }
          };
        }

        $scope.openBefore = open(true);
        $scope.openAfter = open();

        $scope.search = function (day) {
          Utils.searchByTime(day, $scope, function () {
            _search();
          });
        };

      }]);
}());