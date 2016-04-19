(function () {
  'use strict';
  angular.module('BIUIApp')
    .factory('ApiService', ['$http', function ($http) {
      var URL = 'http://localhost:9999/dmp/';

      function reqDataWrapper(data) {
        if (data.endTime && data.startTime) {
          data.endTime = data.endTime + 24 * 3600 * 1000 - 1;
        }

        return data;
      }

      return {
        getDomains: function (fn, data) {
          $http.post(URL + 'domains', reqDataWrapper(data))
            .then(function (response) {
              fn(response);
            }, function (err) {
              console.log(err);
            });
        },
        getDomainDetail: function (fn, data) {
          $http.post(URL + 'domain/detail', reqDataWrapper(data))
            .then(function (response) {
              fn(response);
            }, function (err) {
              console.log(err);
            });
        },
        getCarriers: function (fn, data) {
          $http.post(URL + 'carriers', reqDataWrapper(data))
            .then(function (response) {
              fn(response);
            }, function (err) {
              console.log(err);
            });
        },
        getBrowsers: function (fn, data) {
          $http.post(URL + 'browsers', reqDataWrapper(data))
            .then(function (response) {
              fn(response);
            }, function (err) {
              console.log(err);
            });
        },
        getRegions: function (fn, data) {
          $http.post(URL + 'regions', reqDataWrapper(data))
            .then(function (response) {
              fn(response);
            }, function (err) {
              console.log(err);
            });
        }
      };


    }]);
}());