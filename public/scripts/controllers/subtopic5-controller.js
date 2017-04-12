app.controller('Subtopic5Controller', ['DataFactory', '$firebaseAuth','$http', '$location', function(DataFactory, $firebaseAuth, $http, $location){

  var self = this;

  self.subtopicIdeas5 = DataFactory.subtopicIdeas5;

//redirect to add idea view
  self.createIdea = function() {
    $location.path('/idea');
  }

//get moreComments button click
  self.moreComments = function() {
    console.log('comments clicked')
    $location.path('/comment');
  }




}]);
