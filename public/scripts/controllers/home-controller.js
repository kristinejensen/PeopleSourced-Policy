app.controller('HomeController', ['$http', '$location', 'TopicsFactory', function($http, $location, TopicsFactory){
  var self = this;
  self.message = 'hey what is up';

//begin arri's code
  self.mainTopic = TopicsFactory.mainTopic;
  self.subTopic = TopicsFactory.subTopic;

//end arri's code

  self.redirectLogin = function () {
    $location.url('/login');
  }

  self.redirectIdea = function () {
    $location.url('/idea');
  }

}]);
