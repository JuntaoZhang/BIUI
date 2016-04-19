(function () {
  'use strict';
  angular.module('BIUIApp')
    .controller('DomainDetailCtrl',
      ['$scope', '$stateParams', '$http', 'ngTableParams', 'ApiService', 'Utils',
        function ($scope, $stateParams, $http, NgTableParams, ApiService, Utils) {
          function getStartTime() {
            return new Date($scope.startTime).getTime();
          }

          function getEndTime() {
            return new Date($scope.endTime).getTime();
          }

          $scope.legend = ['按天统计'];
          $scope.item = [];
          $scope.data = [];
          $scope.displayed = [];

          $scope.domain = $stateParams.domain;
          $scope.startTime = Utils.getDateString(new Date($stateParams.startTime).getTime());
          $scope.endTime = Utils.getDateString(new Date($stateParams.endTime).getTime());

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
            var data = {
              'startTime': getStartTime(),
              'endTime': getEndTime(),
              'searchDomain': $scope.domain
            };
            ApiService.getDomainDetail(function (response) {
              $scope.displayed = [];
              $scope.item = [];
              $scope.data = [];
              var data = [];
              var item = [];
              $.each(response.data.results, function (index, row) {
                var time = Utils.getDateString(Number(row[0]));
                $scope.displayed.push({
                  'date': time,
                  'number': row[1]
                });
                item.push(time);
                data.push(row[1]);
              });

              $scope.item = (item.reverse());
              $scope.data.push(data.reverse());

              $scope.isLoading = false;
              $scope.tableParams.reload();

              _chart();
            }, data);
          }

          _search();

          function _chart() {
            var option = {
              // 提示框，鼠标悬浮交互时的信息提示
              tooltip: {
                show: true,
                trigger: 'item'
              },
              // 图例
              legend: {
                data: $scope.legend
              },
              // 横轴坐标轴
              xAxis: [{
                type: 'category',
                data: $scope.item
              }],
              // 纵轴坐标轴
              yAxis: [{
                type: 'value'
              }],
              // 数据内容数组
              series: (function () {
                var serie = [];
                for (var i = 0; i < $scope.legend.length; i++) {
                  var item = {
                    name: $scope.legend[i],
                    type: 'line',
                    data: $scope.data[i]
                  };
                  serie.push(item);
                }
                return serie;
              }())
            };
            var myChart = echarts.init(document.getElementById('domain-charts'), 'macarons');
            myChart.setOption(option);
          }

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