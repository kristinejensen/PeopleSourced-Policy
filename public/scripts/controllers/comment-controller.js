app.controller('CommentController', ['$firebaseAuth', '$http', '$location', 'DataFactory', function($firebaseAuth, $http, $location, DataFactory){

  var self = this;
  var auth = $firebaseAuth();

//adds idea like to DB
  self.addLiked = function() {
    console.log("addLiked button clicked");
  }
//adds idea loved to DB
  self.addLoved = function() {
    console.log("addLoved button clicked");
  }
//adds idea flag to DB
  self.addFlag = function() {
    console.log("addFlag button clicked");
  }

//adds new comment to DB
  self.addComment = function(newComment) {
    console.log(newComment);
    self.newComment = {};
    DataFactory.addComment(newComment);
  }


}]);//end of app.controller()
