app.controller('CommentController', ['$firebaseAuth', '$http', '$location', 'DataFactory', function($firebaseAuth, $http, $location, DataFactory){

  var self = this;
  var auth = $firebaseAuth();

  self.commentsObject = DataFactory.commentsObject;

//adds idea like to DB
  self.addLiked = function(comments) {
    console.log("addLiked button clicked:", comments.id);
  }
//adds idea flag to DB
  self.addFlag = function() {
    console.log("addFlag button clicked");
  }
//add comment to comment to DB
  self.commentRedirect = function() {
    console.log('button click');
    $location.url('/comment');
  }
//adds new comment to DB
  self.addComment = function(newComment) {
    console.log(newComment);
    self.newComment = {};
    DataFactory.addComment(newComment);
  }


}]);//end of app.controller()
