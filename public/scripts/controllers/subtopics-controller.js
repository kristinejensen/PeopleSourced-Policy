
app.controller('SubtopicsController', ['DataFactory', 'TopicsFactory', '$http', '$routeParams', '$location', '$firebaseAuth', function(DataFactory, TopicsFactory, $http, $routeParams, $location, $firebaseAuth) {
  var self = this;
  var auth = $firebaseAuth();
  var firebaseUser = auth.$getAuth();
  //THESE TWO ARE THE SAME THING?
  self.subTopic = TopicsFactory.subTopic;
  self.subtopicIdeas = DataFactory.subtopicIdeas;
  self.index = $routeParams.id;
  self.subTopicObject = DataFactory.subTopicObject;
  self.individualSubtopic = TopicsFactory.individualSubTopic;

  thisSubtopic(self.index);

  function thisSubtopic(index){
    TopicsFactory.thisSubtopic(index);
  }

  getIdeas(self.index);

  function getIdeas(index){
    // console.log('FUNCTIONS', index);
    DataFactory.getSubtopicIdeas(index);
  }

  //redirect to home view
  function homeView() {
    $location.path('/home');
  }
  //redirect to correct subtopic view
  //not working :(
  function redirectToSubtopic(url) {
    console.log(url.subtopicId);
    $location.path('/subtopics/' + url.subtopicId);
    getIdeas(self.index);
  }
  //redirect to add idea view
  self.createIdea = function() {
    $location.path('/idea');
  }
  // //get moreComments button click
  // self.moreComments = function() {
  //   $location.path('/comment/');
  // }

  // var userMatchObject = DataFactory.userMatchObject.list;
  // console.log('userMatchObject.list: ', userMatchObject);
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

  //get moreComments button click
  self.moreComments = function(subtopicIdea) {
    $location.path('/comment/' + subtopicIdea.id);
    console.log(subtopicIdea.id);
  }


}]);//end of my.app
