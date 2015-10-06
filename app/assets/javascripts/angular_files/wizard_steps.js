var app = angular.module("wizard-steps", ["ui.bootstrap", 'ng-rails-csrf', 'ngRoute', 'ngAside', 'smart-table', 'tien.clndr']);

app.config(['$routeProvider', '$locationProvider', function AppConfig($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
}]);
