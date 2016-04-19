(function () {
  'use strict';
  angular.module('BIUIApp')
    .controller('RegionsCtrl', ['$scope', '$http', 'ApiService', 'Utils', 'ngTableParams',
      function ($scope, $http, ApiService, Utils, NgTableParams) {
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

        $scope.tableParams = new NgTableParams({
          page: 1,
          count: 10
        }, {
          getData: function ($defer, params) {
            $defer.resolve($scope.displayed.slice(
              (params.page() - 1) * params.count(), params.page() * params.count()
            ));
            params.total($scope.displayed.length);
          }
        });

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
            'searchValue': $scope.searchValue
          };

          ApiService.getRegions(function (response) {
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
            $scope.tableParams.reload();
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
            title: {
              text: '地域访问统计',
              x: 'center'
            },
            tooltip: {
              trigger: 'item'
            },
            legend: {
              orient: 'vertical',
              x: 'left',
              data: ['访问量']
            },
            dataRange: {
              min: 0,
              max: $scope.data[5].value,
              x: 'left',
              y: 'bottom',
              text: ['高', '低'],           // 文本，默认为数值文本
              calculable: true
            },
            toolbox: {
              show: false
            },
            roamController: {
              show: true,
              x: 'right',
              mapTypeControl: {
                'china': true
              }
            },
            series: [
              {
                name: '访问量',
                type: 'map',
                mapType: 'china',
                roam: false,
                itemStyle: {
                  normal: {label: {show: true}},
                  emphasis: {label: {show: true}}
                },
                data: $scope.data
              }
            ]
          };
          var myChart = echarts.init(document.getElementById('domain-charts'), 'macarons');
          myChart.setOption(option);
        }
      }]);
}());