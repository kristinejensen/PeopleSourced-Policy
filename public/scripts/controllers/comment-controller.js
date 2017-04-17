app.controller('CommentController', ['$firebaseAuth', '$http', '$location', 'DataFactory', function($firebaseAuth, $http, $location, DataFactory){


  var self = this;
  var auth = $firebaseAuth();

//shows all comments from BD to view
  self.commentsObject = DataFactory.commentsObject;

//add comment to comment to DB
  self.commentRedirect = function() {
//redirect after submission
    $location.url('/comment');
  }//end of self.commentRedirect()

//adds new comment to DB
  self.addComment = function(newComment) {
//sents comment from view to DB
    DataFactory.addComment(newComment);
//empties inputs after submission
    self.newComment = {};
//redirect after submission
    $location.url('/comment');
  }//end of self.addComment()

  self.createIdea = function() {
//redirect after submission
    $location.path('/idea');
  }

  self.showComment = false;

   self.showCommentArea = function(){
     console.log("button clicked");
     self.showComment = true;
   }
//left off here
   self.addSubComment = function(newSubComment){
     console.log("newSubComment :", newSubComment);
     DataFactory.addNew
   }

}]);//end of app.controller()
