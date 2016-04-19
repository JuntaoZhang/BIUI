(function () {
  'use strict';
  angular
    .module('BIUIApp', [
      'oc.lazyLoad',
      'ui.router',
      'ui.bootstrap',
      'angular-loading-bar'
    ])
    .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider',
      function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {

        $ocLazyLoadProvider.config({
          debug: false,
          events: true
        });

        $urlRouterProvider.otherwise('/dashboard/home');

        $stateProvider
          .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'views/dashboard/main.html',
            resolve: {
              loadMyDirectives: function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                  {
                    name: 'BIUIApp',
                    files: [
                      'scripts/directives/header/header.js',
                      'scripts/directives/header/header-notification/header-notification.js',
                      'scripts/directives/sidebar/sidebar.js',
                      'scripts/directives/sidebar/sidebar-search/sidebar-search.js'
                    ]
                  },
                  {
                    name: 'toggle-switch',
                    files: [
                      'bower_components/angular-toggle-switch/angular-toggle-switch.min.js',
                      'bower_components/angular-toggle-switch/angular-toggle-switch.css'
                    ]
                  },
                  {
                    name: 'ngCookies',
                    files: ['bower_components/angular-cookies/angular-cookies.js']
                  },
                  {
                    name: 'ngResource',
                    files: ['bower_components/angular-resource/angular-resource.js']
                  },
                  {
                    name: 'ngSanitize',
                    files: ['bower_components/angular-sanitize/angular-sanitize.js']
                  },
                  /*todo here is a bug*/
                  /*{
                   name: 'ngTouch',
                   files: ['bower_components/angular-touch/angular-touch.js']
                   },*/
                  {
                    name: 'ngAnimate',
                    files: ['bower_components/angular-animate/angular-animate.js']
                  }]);
              }
            }
          })
          .state('dashboard.home', {
            url: '/home',
            controller: 'MainCtrl',
            templateUrl: 'views/dashboard/home.html',
            resolve: {
              loadMyFiles: function ($ocLazyLoad) {
                return $ocLazyLoad.load([{
                  name: 'BIUIApp',
                  files: [
                    'scripts/controllers/main.js',
                    'scripts/directives/timeline/timeline.js',
                    'scripts/directives/notifications/notifications.js',
                    'scripts/directives/chat/chat.js',
                    'scripts/directives/dashboard/stats/stats.js'
                  ]
                }
                ]);
              }
            }
          })
          .state('dashboard.form', {
            templateUrl: 'views/form.html',
            url: '/form'
          })
          .state('dashboard.blank', {
            templateUrl: 'views/pages/blank.html',
            url: '/blank'
          })
          .state('dashboard.regions', {
            templateUrl: 'views/pages/regions.html',
            url: '/regions',
            controller: 'RegionsCtrl',
            resolve: {
              loadMyFile: function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                  {
                    files: [
                      'bower_components/echarts/build/dist/echarts-all.js'
                    ]
                  },
                  {
                    name: 'ngTable',
                    files: [
                      'bower_components/ng-table/dist/ng-table.css',
                      'bower_components/ng-table/dist/ng-table.js'
                    ]
                  },
                  {
                    name: 'BIUIApp',
                    files: [
                      'scripts/services/api.js',
                      'scripts/services/utils.js',
                      'scripts/controllers/regions.js'
                    ]
                  }
                ]);
              }
            }
          })
          .state('dashboard.browsers', {
            templateUrl: 'views/pages/browsers.html',
            url: '/browsers',
            controller: 'BrowsersCtrl',
            resolve: {
              loadMyFile: function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                  {
                    files: [
                      'bower_components/echarts/build/dist/echarts-all.js'
                    ]
                  },
                  {
                    name: 'BIUIApp',
                    files: [
                      'scripts/services/api.js',
                      'scripts/services/utils.js',
                      'scripts/controllers/browsers.js'
                    ]
                  }
                ]);
              }
            }
          })
          .state('dashboard.carriers', {
            templateUrl: 'views/pages/carriers.html',
            url: '/carriers',
            controller: 'CarriersCtrl',
            resolve: {
              loadMyFile: function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                  {
                    files: [
                      'bower_components/echarts/build/dist/echarts-all.js'
                    ]
                  },
                  {
                    name: 'BIUIApp',
                    files: [
                      'scripts/services/api.js',
                      'scripts/services/utils.js',
                      'scripts/controllers/carriers.js'
                    ]
                  },
                  {
                    name: 'smart-table',
                    files: [
                      'bower_components/angular-smart-table/dist/smart-table.js'
                    ]
                  }
                ]);
              }
            }
          })
          .state('dashboard.domains', {
            templateUrl: 'views/pages/domains.html',
            url: '/domains',
            controller: 'DomainsCtrl',
            resolve: {
              loadMyFile: function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                  {
                    files: [
                      'bower_components/echarts/build/dist/echarts-all.js'
                    ]
                  },
                  {
                    name: 'BIUIApp',
                    files: [
                      'scripts/services/api.js',
                      'scripts/services/utils.js',
                      'scripts/controllers/domains.js'
                    ]
                  },
                  {
                    name: 'smart-table',
                    files: [
                      'bower_components/angular-smart-table/dist/smart-table.js'
                    ]
                  }
                ]);
              }
            }
          })
          .state('dashboard.domain-detail', {
            templateUrl: 'views/pages/domain-details.html',
            url: '/:domain/detail/:startTime/:endTime',
            controller: 'DomainDetailCtrl',
            resolve: {
              loadMyFile: function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                  {
                    files: [
                      'bower_components/echarts/build/dist/echarts-all.js'
                    ]
                  },
                  {
                    name: 'ngTable',
                    files: [
                      'bower_components/ng-table/dist/ng-table.css',
                      'bower_components/ng-table/dist/ng-table.js'
                    ]
                  },
                  {
                    name: 'BIUIApp',
                    files: [
                      'scripts/services/api.js',
                      'scripts/services/utils.js',
                      'scripts/controllers/domain-detail.js'
                    ]
                  }
                ]);
              }
            }
          })
          .state('login', {
            templateUrl: 'views/pages/login.html',
            url: '/login'
          })
          .state('dashboard.chart', {
            templateUrl: 'views/chart.html',
            url: '/chart',
            controller: 'ChartCtrl',
            resolve: {
              loadMyFile: function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                  {
                    name: 'chart.js',
                    files: [
                      'bower_components/angular-chart.js/dist/angular-chart.min.js',
                      'bower_components/angular-chart.js/dist/angular-chart.css'
                    ]
                  },
                  {
                    name: 'BIUIApp',
                    files: ['scripts/controllers/chartContoller.js']
                  }]);
              }
            }
          })
          .state('dashboard.table', {
            templateUrl: 'views/table.html',
            url: '/table'
          })
          .state('dashboard.panels-wells', {
            templateUrl: 'views/ui-elements/panels-wells.html',
            url: '/panels-wells'
          })
          .state('dashboard.buttons', {
            templateUrl: 'views/ui-elements/buttons.html',
            url: '/buttons'
          })
          .state('dashboard.notifications', {
            templateUrl: 'views/ui-elements/notifications.html',
            url: '/notifications'
          })
          .state('dashboard.typography', {
            templateUrl: 'views/ui-elements/typography.html',
            url: '/typography'
          })
          .state('dashboard.icons', {
            templateUrl: 'views/ui-elements/icons.html',
            url: '/icons'
          })
          .state('dashboard.grid', {
            templateUrl: 'views/ui-elements/grid.html',
            url: '/grid'
          });
      }]);
}());