app.controller('Subtopic1Controller', ['DataFactory', '$firebaseAuth','$http', '$location', function(DataFactory, $firebaseAuth, $http, $location){

  var self = this;

  self.subtopicIdeas = DataFactory.subtopicIdeas;

//redirect to add idea view
  self.createIdea = function() {
    $location.path('/idea');
  }

//add liked button click
  self.addLiked = function() {
    console.log('Liked clicked')
    DataFactory.addLike;
  }
//add loved button click
  self.addLoved = function() {
    console.log('Loved clicked')
    DataFactory.addLoved;
  }
//get moreComments button click
  self.moreComments = function() {
    console.log('comments clicked')
  }
//add flag button click
  self.addFlag = function() {
    console.log('Flagged clicked')
    DataFactory.addflag;
  }
















}]);
