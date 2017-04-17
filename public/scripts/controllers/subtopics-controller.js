app.controller('SubtopicsController', ['TopicsFactory', '$http', '$routeParams' , function(TopicsFactory, $http, $routeParams) {
  var self = this;

  self.subTopic = TopicsFactory.subTopic;
  self.specificSubTopic = TopicsFactory.specificSubTopic;


  findSpecificSubTopic($routeParams.id);

  function findSpecificSubTopic(id){
    TopicsFactory.findSpecificSubTopic(id);
  }

  // self.thisSubTopic = TopicsFactory.findSpecificSubTopic($routeParams.id);

}]);
