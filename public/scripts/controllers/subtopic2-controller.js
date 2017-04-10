app.controller('Subtopic2Controller', ['DataFactory', '$firebaseAuth','$http', '$location', function(DataFactory, $firebaseAuth, $http, $location){

  var self = this;

  self.subtopicIdeas2 = DataFactory.subtopicIdeas2;


//redirect to add idea view
  self.createIdea = function() {
    $location.path('/idea');
  }

//add liked button click
  self.addLiked = function(subtopicIdeas) {
    console.log('Liked clicked: ', subtopicIdeas)
    DataFactory.addLike;
  }
//add loved button click
  self.addLoved = function(subtopicIdeas) {
    console.log('Loved clicked: ', subtopicIdeas)
    DataFactory.addLoved;
  }
//get moreComments button click
  self.moreComments = function() {
    console.log('comments clicked');
    $location.path('/comment');
  }
//add flag button click
  self.addFlag = function(subtopicIdeas) {
    console.log('Flagged clicked: ', subtopicIdeas)
    DataFactory.addFlag;
  }


















}]);
