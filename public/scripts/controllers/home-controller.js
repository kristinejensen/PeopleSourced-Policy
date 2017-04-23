
app.controller('HomeController', ['DataFactory', 'TopicsFactory', '$firebaseAuth', '$http', '$location', function(DataFactory, TopicsFactory, $firebaseAuth, $http, $location){
  var self = this;
  var auth = $firebaseAuth();
  var firebaseUser = auth.$getAuth();

  //populates the main topic area
  self.mainTopic = TopicsFactory.mainTopic;
  //populates select option with subtopics
  self.subTopic = TopicsFactory.subTopic;
  //populates tally fields
  self.userTally = DataFactory.userTally;
  self.ideasTally = DataFactory.ideasTally;
  self.commentsTally = DataFactory.commentsTally;
  self.likesTally = DataFactory.likesTally;

  TopicsFactory.findActiveTopic();

  <!--
  /* ============================================================================= *
  *               ADD NEW IDEA                                                     *
  * ============================================================================= */
  -->
  self.addNewIdea = function(idea) {
    //sources firebaseUser in the function
    var auth = $firebaseAuth();
    var firebaseUser = auth.$getAuth();
    var notyf = new Notyf();

    if (firebaseUser === null){
      swal("Sorry, we couldn't process your request.  You must be logged in!", "Try Again!", "error");
    }

    console.log('idea is?', idea);
    //name and email is added to the idea object
    if(idea.subtopicId) {

    var newIdea = {
      name : firebaseUser.displayName,
      email : firebaseUser.email,
      subtopicId : idea.subtopicId,
      title : idea.title,
      description : idea.description
    }
    //sents the idea object to factory
    DataFactory.addNewIdea(newIdea)
    //redirects the user to the subtopic they chose from the dropdown
    redirectToSubtopic(newIdea);
    //empties inputs on submit
    self.idea = {};
  } else {
    notyf.alert('Please select a subtopic from the dropdown.');
  }
    //loads the ideas
    // getIdeas(idea.subtopicId);
  }//end of self.createIdea()

  function getIdeas(index){
    DataFactory.getSubtopicIdeas(index);
  }
  <!--
  /* ============================================================================= *
  *                  REDIRECTS                                                     *
  * ============================================================================= */
  -->
  function redirectToSubtopic(url) {
    console.log(url.subtopicId);
    $location.path('/subtopics/' + url.subtopicId);
    DataFactory.getSubtopicIdeas(self.index);
  }

  function homeView() {
    $location.path('/home');
  }//end of homeView()

  self.redirectLogin = function () {
    $location.url('/login');
  }//end of redirectLogin()

  //redirect to add idea view
  self.createIdea = function() {
    //redirect after submission
    $location.url('/idea');
  }//end of self.createIdea

// // console.log("userMatchObject ",userMatchObject);
//   self.addNewIdea = function(idea) {
//     var userMatchObject = DataFactory.userMatchObject.list;
//     console.log(userMatchObject);
//     //sources firebaseUser in the function
//     var auth = $firebaseAuth();
//     var firebaseUser = auth.$getAuth();
//     //container to loop id's through
//     var id = "";
//     //loops through all users email to find correct id
//       for (var i = 0; i < userMatchObject.length; i++) {
//         if (userMatchObject[i].email == firebaseUser.email) {
//           var id = userMatchObject[i].id;
//         }//end of if
//       };//end of for loop
//
//     //name and email is added to object
//       var newIdea = {
//         name : firebaseUser.displayName,
//         email : firebaseUser.email,
//         subtopicId : idea.subtopicId,
//         title : idea.title,
//         description : idea.description,
//         id : id
//       }
//       console.log('new idea?: ', newIdea);
//     //sents object to factory
//       DataFactory.addNewIdea(newIdea);
//     //empties inputs on submit
//       self.idea = {};
//     //redirect to correct subtopic page after submit
//     //not working :(
//       // subView(idea.subtopicId);
//     }//end of self.createIdea()

}]);//end of app.controller()
