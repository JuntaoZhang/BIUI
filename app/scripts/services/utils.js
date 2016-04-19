(function () {
  'use strict';
  angular.module('BIUIApp')
    .factory('Utils', [function () {
      //TODO 需要移到后台
      function getDateStr(AddDayCount) {
        var dd = new Date();
        dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
        return getDateString(dd);
      }

      function checkTime(i) {
        if (i < 10) {
          i = '0' + i;
        }
        return i;
      }

      function getDateString(dd) {
        dd = new Date(dd);
        var y = dd.getFullYear();
        var m = dd.getMonth() + 1;//获取当前月份的日期
        var d = dd.getDate();
        return y + '/' + checkTime(m) + '/' + checkTime(d);
      }

      var service = {
        getDateString: getDateString,
        getToday: function () {
          return getDateStr(0);
        },
        getYesterday: function () {
          return getDateStr(-1);
        },
        getAWeekAgo: function () {
          return getDateStr(-7);
        },
        getAMonthAgo: function () {
          return getDateStr(-30);
        },
        searchByTime: function (day, $scope, fn) {
          switch (day) {
            case -1:
              $scope.startTime = service.getYesterday();
              $scope.endTime = service.getToday();
              break;
            case -7:
              $scope.startTime = service.getAWeekAgo();
              $scope.endTime = service.getToday();
              break;
            case -30:
              $scope.startTime = service.getAMonthAgo();
              $scope.endTime = service.getToday();
              break;
            default:
          }
          fn();
        }

      };
      return service;

    }]);
}());