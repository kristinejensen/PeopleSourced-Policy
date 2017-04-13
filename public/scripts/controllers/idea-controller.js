app.controller('IdeaController', ['DataFactory', '$firebaseAuth', '$location', function(DataFactory, $firebaseAuth, $location) {
//CHRIS’S CODE STARTS HERE

  var self = this;
  var auth = $firebaseAuth();
  var firebaseUser = auth.$getAuth();

//redirect to home view
  function homeView() {
    $location.path('/home');
  }
//current subtopics for select option
  self.subTopicObject = DataFactory.subTopicObject;

//all user email and id
var userMatchObject = DataFactory.userMatchObject.list;
//function adds new idea to DB
  self.addNewIdea = function(idea) {
//sources firebaseUser in the function
    var firebaseUser = auth.$getAuth();
//container to loop id's through
    var id = "";
//loops through all users email to find correct id
      for (var i = 0; i < userMatchObject.length; i++) {
        if (userMatchObject[i].email == firebaseUser.email) {
          var id = userMatchObject[i].id;
        }//end of if
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
//sents object to factory
    DataFactory.addNewIdea(newIdea);
//empties inputs on submit
    self.idea = {};
//redirect after submit
    homeView();
  };//end of addNewIdea()

//CHRIS’S CODE ENDS HERE
}]);//end of app.controller()
