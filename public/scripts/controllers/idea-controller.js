app.controller('IdeaController', ['DataFactory', '$firebaseAuth', '$location', function(DataFactory, $firebaseAuth, $location) {

  var self = this;
  var auth = $firebaseAuth();
  var firebaseUser = auth.$getAuth();

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
    // if (subtopicTitle == "subtopic 1") {
    //   $location.path('/subtopic1');
    // } else if (subtopicTitle == "subtopic 2") {
    //   $location.path('/subtopic2');
    // } else if (subtopicTitle == "subtopic 3") {
    //   $location.path('/subtopic3');
    // } else if (subtopicTitle == "subtopic 4") {
    //   $location.path('/subtopic4');
    // } else if (subtopicTitle == "subtopic 5") {
    //   $location.path('/subtopic4');
    // } else {
    //   $location.path('/home');
    // }
  };//end of addNewIdea()

}]);//end of app.controller()
