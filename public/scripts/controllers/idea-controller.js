app.controller('IdeaController', ['DataFactory', '$firebaseAuth', '$location', function(DataFactory, $firebaseAuth, $location) {

  var self = this;
  var auth = $firebaseAuth();
  self.subTopicObject = DataFactory.subTopicObject;

//redirect to home view
  function homeView() {
    $location.path('/home');
  }

//function adds new idea to DB
  self.addNewIdea = function(newIdea) {
    console.log(newIdea);
    DataFactory.addNewIdea(newIdea);
    self.newIdea = {};
    homeView();
  }

}]);//end of app.controller()
