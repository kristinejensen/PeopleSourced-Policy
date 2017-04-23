
app.controller('IdeaController', ['DataFactory', '$firebaseAuth', '$location', function(DataFactory, $firebaseAuth, $location) {

  var self = this;
  var auth = $firebaseAuth();
  var firebaseUser = auth.$getAuth();

  self.logOut = function(){
    auth.$signOut().then(function(){
      console.log('Logging the user out!');
      self.redirectHome();
    });
  };


  // function to redirect user to home page after logout
  self.redirectHome = function(){
    $location.url('/home');
  }

//redirect to home view
  function homeView() {
    // $location.url('/');

  }//end of homeView()

//current subtopics for select option
  self.subTopicObject = DataFactory.subTopicObject;

//function adds new idea to DB
  self.addNewIdea = function(idea) {
    var userMatchObject = DataFactory.userMatchObject.list;
//sources firebaseUser in the function
    var firebaseUser = auth.$getAuth();
//alert if user in not logged in
    if (firebaseUser === null){
      swal("Sorry, we couldn't process your request.  You must be logged in!", "Try Again!", "error");
    }
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

}]);//end of app.controller()
