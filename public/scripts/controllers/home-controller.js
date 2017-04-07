app.controller('HomeController', ['$http', '$location', function($http, $location){
  var self = this;

self.redirectLogin = function () {
  $location.url('/login');
}

self.redirectIdea = function () {
  $location.url('/idea');
}

}]);
