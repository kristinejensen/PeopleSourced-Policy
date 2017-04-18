app.controller('SubtopicsController', ['DataFactory', 'TopicsFactory', '$http', '$routeParams', '$location', '$firebaseAuth', function(DataFactory, TopicsFactory, $http, $routeParams, $location, $firebaseAuth) {
  var self = this;
  //THESE TWO ARE THE SAME THING?
  self.subTopic = TopicsFactory.subTopic;
  self.subtopicIdeas = DataFactory.subtopicIdeas;
  self.index = $routeParams.id;
  console.log('index on load: ', self.index);

  getIdeas(self.index);

  function getIdeas(index){
    DataFactory.getSubtopicIdeas(index);
  }

  //BEGIN CHRIS' CODE
  //redirect to home view
  function homeView() {
    $location.path('/home');
  }
  //redirect to correct subtopic view
  //not working :(
  function redirectToSubtopic(url) {
    $location.path('/subtopics/' + url);
    getIdeas(url);
    console.log('index in redirect: ', self.index);
  }
  //redirect to add idea view
  self.createIdea = function() {
    $location.path('/idea');
  }
  //get moreComments button click
  self.moreComments = function() {
    $location.path('/comment');
  }

  self.addNewIdea = function(idea) {
    //sources firebaseUser in the function
    var auth = $firebaseAuth();
    var firebaseUser = auth.$getAuth();
    //creates the new idea object from form/auth
      var newIdea = {
        name : firebaseUser.displayName,
        email : firebaseUser.email,
        subtopicId : idea.subtopicId,
        title : idea.title,
        description : idea.description,
        id : idea.subtopicId
      }
      //sents object to factory
      DataFactory.addNewIdea(newIdea);
      //redirect to correct subtopic page after submit
      redirectToSubtopic(newIdea.id);
      getIdeas(newIdea.id);

    //empties inputs on submit
      self.idea = {};
    }//end of self.createIdea()
  //END CHRIS' CODE
}]);
