
app.controller('IdeaController', ['DataFactory', 'TopicsFactory', '$firebaseAuth', '$location', function(DataFactory, TopicsFactory, $firebaseAuth, $location) {

  var self = this;
  var auth = $firebaseAuth();
  var firebaseUser = auth.$getAuth();
  //current subtopics for select option
  self.subTopic = TopicsFactory.subTopic;

  //function adds new idea to DB
  self.addNewIdea = function(idea) {
    //sources firebaseUser in the function
    var auth = $firebaseAuth();
    var firebaseUser = auth.$getAuth();
    //The new idea object with the user inforamtion attached.
    var newIdea = {
      name : firebaseUser.displayName,
      email : firebaseUser.email,
      subtopicId : idea.subtopicId,
      title : idea.title,
      description : idea.description
    }
    //Sends the new idea object to factory
    DataFactory.addNewIdea(newIdea).then(function(response){
      // redirect to correct subtopic page after submit
      redirectToSubtopic(newIdea);
    });
    //empties inputs on submit
    self.idea = {};
  }//end of self.createIdea()

  function redirectToSubtopic(url) {
    console.log(url.subtopicId);
    $location.path('/subtopics/' + url.subtopicId);
    DataFactory.getSubtopicIdeas(self.index);
  }

}]);//end of app.controller()
