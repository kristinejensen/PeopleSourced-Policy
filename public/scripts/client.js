var app = angular.module('ConnectApp', ['ngRoute','firebase', 'ui.bootstrap']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/home', {
    templateUrl: 'views/home.html',
    controller: 'HomeController',
    controllerAs: 'hc'
  })
  .when('/login', {
    templateUrl: 'views/login.html',
    controller: 'LoginController',
    controllerAs: 'lc'
  })
  .when('/idea', {
    templateUrl: 'views/idea.html',
    controller: 'IdeaController',
    controllerAs: 'ic'
  })
  .when('/flag', {
    templateUrl: 'views/flag.html',
    controller: 'FlagController',
    controllerAs: 'fc'
  })
  .when('/comment', {
    templateUrl: 'views/comments.html',
    controller: 'CommentController',
    controllerAs: 'cc'
  })
  .when('/subtopics', {
    templateUrl: 'views/subtopics/subtopics.html',
    controller: 'SubtopicController',
    controllerAs: 'stc'
  })
  .when('/views/:id', {
    templateUrl: 'views/comment.html',
    controller: 'CommentConnectController',
    controllerAs: 'ccc'
  })
  .when('/admin-manage-users', {
    templateUrl: 'views/admin-views/admin-manage-users.html',
    controller: 'AdminManageUsersController',
    controllerAs: 'amuc'
  })
  .when('/admin-flags', {
    templateUrl: 'views/admin-views/admin-flags.html',
    controller: 'AdminFlaggedController',
    controllerAs: 'afc'
  })
  .when('/admin-reports', {
    templateUrl: 'views/admin-views/admin-reports.html',
    controller: 'AdminReportsController',
    controllerAs: 'arc'
  })
  .when('/admin-topics', {
    templateUrl: 'views/admin-views/admin-topics.html',
    controller: 'AdminTopicsController',
    controllerAs: 'atc'
  })
  .otherwise({
    redirectTo: 'home'
  })
}]);
