app.controller('CommentController', ['$firebaseAuth', '$http', '$location', 'DataFactory', function($firebaseAuth, $http, $location, DataFactory){

  var self = this;
  var auth = $firebaseAuth();

  self.commentsObject = DataFactory.commentsObject;

//add comment to comment to DB
  self.commentRedirect = function() {
    console.log('button click');
    $location.url('/comment');
  }
//adds new comment to DB
  self.addComment = function(newComment) {
    console.log(newComment);
    DataFactory.addComment(newComment);
    self.newComment = {};
    $location.url('/home');
  }


}]);//end of app.controller()
