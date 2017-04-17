app.controller('SubtopicsController', ['TopicsFactory', '$http', '$routeParams' , function(TopicsFactory, $http, $routeParams) {
  var self = this;

  self.subTopic = TopicsFactory.subTopic;
  self.index = $routeParams.id;

}]);
