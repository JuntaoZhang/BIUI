(function () {
  'use strict';
  angular.module('BIUIApp')
    .directive('sidebar',['$location',function() {
      return {
        templateUrl:'scripts/directives/sidebar/sidebar.html',
        restrict: 'E',
        replace: true,
        scope: {
        },
        controller:function($scope){
          $scope.selectedMenu = 'dashboard';
          $scope.collapseVar = -1;
          $scope.multiCollapseVar = -1;

          $scope.check = function(x){
            if(x==$scope.collapseVar)
              $scope.collapseVar = -1;
            else
              $scope.collapseVar = x;
          };

          $scope.multiCheck = function(y){

            if(y==$scope.multiCollapseVar)
              $scope.multiCollapseVar = -1;
            else
              $scope.multiCollapseVar = y;
          };
        }
      }
    }]);
}());