(function () {
  'use strict';
  angular.module('BIUIApp')
    .controller('BrowsersCtrl', ['$scope', '$http', 'ApiService', 'Utils',
      function ($scope, $http, ApiService, Utils) {
        $scope.displayed = [];
        $scope.startTime = Utils.getDateString(new Date().getTime() - 1000 * 3600 * 24);
        $scope.endTime = Utils.getDateString(new Date().getTime() - 1000 * 3600 * 24);
        $scope.searchValue = '';

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
            'searchValue': $scope.searchValue,
            'pageSize': 10
          };

          ApiService.getBrowsers(function (response) {
            $scope.displayed = [];
            $scope.item = [];
            $scope.data = [];
            $.each(response.data.results, function (index, row) {
              $scope.displayed.push({
                'domain': row[0],
                'number': row[1]
              });
              $scope.item.push(row[0]);
              $scope.data.push({
                'name': row[0],
                'value': Number(row[1])
              });
            });
            $scope.isLoading = false;
            if ($scope.item.length > 0) {
              _chart();
            }
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

        function _chart() {
          var option = {
            title : {
              text: '浏览器TOP10',
              x:'center'
            },
            tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
              orient : 'vertical',
              x : 'left',
              data:$scope.item
            },
            toolbox: {
              show : false
            },
            calculable : true,
            series : [
              {
                name:'',
                type:'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:$scope.data
              }
            ]
          };
          var myChart = echarts.init(document.getElementById('domain-charts'), 'macarons');
          myChart.setOption(option);
        }
      }]);
}());