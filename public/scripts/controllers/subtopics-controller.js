app.controller('SubtopicsController', ['DataFactory', 'TopicsFactory', '$http', '$routeParams', '$location', '$firebaseAuth', function(DataFactory, TopicsFactory, $http, $routeParams, $location, $firebaseAuth) {
  var self = this;
  //THESE TWO ARE THE SAME THING?
  self.subTopic = TopicsFactory.subTopic;
  self.subtopicIdeas = DataFactory.subtopicIdeas;
  self.index = $routeParams.id;

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
  function subView(url) {
    $location.path('/#!/subtopics/' + url);
  }
  //redirect to add idea view
  self.createIdea = function() {
    $location.path('/idea');
  }
  //get moreComments button click
  self.moreComments = function() {
    $location.path('/comment');
  }

  var userMatchObject = DataFactory.userMatchObject.list;

  self.addNewIdea = function(idea) {
    //sources firebaseUser in the function
    var auth = $firebaseAuth();
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
      console.log('new idea?: ', newIdea);
    //sents object to factory
      DataFactory.addNewIdea(newIdea);
    //empties inputs on submit
      self.idea = {};
    //redirect to correct subtopic page after submit
    //not working :(
      subView(idea.subtopicId);
    }//end of self.createIdea()
  //END CHRIS' CODE
}]);
