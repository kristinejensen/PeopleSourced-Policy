app.controller('SubtopicsController', ['TopicsFactory', '$http', '$routeParams' , function(TopicsFactory, $http, $routeParams) {
  var self = this;

  self.subTopic = TopicsFactory.subTopic;

  // $route.current.templateUrl = '/subtopic/' + $routeParams.name + ".html";

  // self.subTopic = TopicsFactory.subTopic($routeParams.id);

  self.subTopic = TopicsFactory.getSubTopic($routeParams.id);

}]);
