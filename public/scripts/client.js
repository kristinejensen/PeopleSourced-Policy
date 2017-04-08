var app = angular.module('ConnectApp', ['ngRoute','firebase']);

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
    templateUrl: 'views/idea.html',
    controller: 'FlagController',
    controllerAs: 'fc'
  })
  .when('/comment', {
    templateUrl: 'views/comments.html',
    controller: 'CommentController',
    controllerAs: 'cc'
  })
  .when('/subtopic1', {
    templateUrl: 'views/subtopic1.html',
    controller: 'Subtopic1Controller',
    controllerAs: 'st1c'
  })
  .when('/subtopic2', {
    templateUrl: 'views/subtopic2.html',
    controller: 'Subtopic2Controller',
    controllerAs: 'st2c'
  })
  .when('/subtopic3', {
    templateUrl: 'views/subtopic3.html',
    controller: 'Subtopic3Controller',
    controllerAs: 'st3c'
  })
  .when('/subtopic4', {
    templateUrl: 'views/subtopic4.html',
    controller: 'Subtopic4Controller',
    controllerAs: 'st4c'
  })
  .when('/subtopic5', {
    templateUrl: 'views/subtopic5.html',
    controller: 'Subtopic5Controller',
    controllerAs: 'st5c'
  })
  .when('/views/:id', {
    templateUrl: 'views/comment.html',
    controller: 'CommentConnectController',
    controllerAs: 'ccc'
  })
  .when('/admin-manage-users', {
    templateUrl: 'views/admin-manage-users.html',
    controller: 'AdminManageUsersController',
    controllerAs: 'amuc'
  })
  .otherwise({
    redirectTo: 'home'
  })
}]); // end of app.config


//only the /admin-flagged section has been changed.
// IMPORTANT be sure to change templateURL, controller, and controllerAs


  // .when('/admin-flagged', {
  //   templateUrl: 'views/subtopic3.html',
  //   controller: 'SubtopicOneController',
  //   controllerAs: 'st3c'
  // })
  // .when('/admin-reports', {
  //   templateUrl: 'views/subtopic5.html',
  //   controller: 'SubtopicOneController',
  //   controllerAs: 'st5c'
  // })
  // .when('/admin-topics', {
  //   templateUrl: 'views/comment.html',
  //   controller: 'CommentConnectController',
  //   controllerAs: 'ccc'
  // })
