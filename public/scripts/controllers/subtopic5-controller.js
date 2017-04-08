app.controller('Subtopic5Controller', ['DataFactory', '$firebaseAuth','$http', '$location', function(DataFactory, $firebaseAuth, $http, $location){

  var self = this;

//redirect to add idea view
  self.createIdea = function() {
    $location.path('/idea');
  }



















}]);
