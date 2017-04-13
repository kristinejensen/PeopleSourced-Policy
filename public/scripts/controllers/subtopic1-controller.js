app.controller('Subtopic1Controller', ['DataFactory', '$firebaseAuth','$http', '$location', function(DataFactory, $firebaseAuth, $http, $location){
//CHRIS’S CODE STARTS HERE

  var self = this;
//displays specific subtopic ideas to view
   self.subtopicIdeas1 = DataFactory.subtopicIdeas1;

//user name's and id's (used to replace user id with name)
  var userNameIdObject = DataFactory.userNameIdObject;
    // for (var i = 0; i < userNameIdObject.length; i++) {
    //   userNameIdObject[i]
    // }






//redirect to add idea view
  self.createIdea = function() {
//redirect after submission
    $location.path('/idea');
  }
//get moreComments button click
  self.moreComments = function() {
//redirect after submission
    $location.path('/comment');
  }

//CHRIS’S CODE ENDS HERE
}]);//end of app.controller()
