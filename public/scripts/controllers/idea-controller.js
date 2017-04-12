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
  self.addNewIdea = function(idea) {
    var firebaseUser = auth.$getAuth();
    
    var newIdea = {
      name : firebaseUser.displayName,
      email : firebaseUser.email,
      subtopicId : idea.subtopicId,
      title : idea.title,
      description : idea.description
    }

    console.log();
    DataFactory.addNewIdea(newIdea);
    self.idea = {};
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
