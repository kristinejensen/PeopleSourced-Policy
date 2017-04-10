app.controller('Subtopic3Controller', ['DataFactory', '$firebaseAuth','$http', '$location', function(DataFactory, $firebaseAuth, $http, $location){

  var self = this;

  self.subtopicIdeas3 = DataFactory.subtopicIdeas3;
//redirect to add idea view
  self.createIdea = function() {
    $location.path('/idea');
  }


















}]);
