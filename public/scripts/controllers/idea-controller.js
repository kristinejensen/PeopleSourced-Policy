app.controller('IdeaController', ['DataFactory', '$firebaseAuth', '$location', function(DataFactory, $firebaseAuth, $location) {
//CHRIS’S CODE STARTS HERE

  var self = this;
  var auth = $firebaseAuth();
  var firebaseUser = auth.$getAuth();

//current subtopics for select option
  self.subTopicObject = DataFactory.subTopicObject;

//redirect to home view
  function homeView() {
    $location.path('/home');
  }
var userMatchObject = DataFactory.userMatchObject.list;
//function adds new idea to DB
  self.addNewIdea = function(idea) {
    var firebaseUser = auth.$getAuth();
    var id = "";
      for (var i = 0; i < userMatchObject.length; i++) {
        if (userMatchObject[i].email == firebaseUser.email) {
          var id = userMatchObject[i].id;
        }
        console.log("user id: ", id)
      };//end of for loop

//name and email is added to object
    var newIdea = {
      name : firebaseUser.displayName,
      email : firebaseUser.email,
      subtopicId : idea.subtopicId,
      title : idea.title,
      description : idea.description,
      id : id
    }
    console.log("newIdea: ",newIdea);
//sents object to factory
    DataFactory.addNewIdea(newIdea);
//empties inputs on submit
    self.idea = {};
//redirect after submit
    homeView();

  };//end of addNewIdea()

//CHRIS’S CODE ENDS HERE
}]);//end of app.controller()
