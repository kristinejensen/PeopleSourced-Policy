app.controller('IdeaController', ['DataFactory', '$firebaseAuth', function(DataFactory, $firebaseAuth) {
  var self = this;

  var auth = $firebaseAuth();

  function homeView() {
    $location.path('/home');
  }

  self.addNewIdea = function(newIdea) {
    console.log(newIdea);
    self.newIdea = {};
  }

}]);
