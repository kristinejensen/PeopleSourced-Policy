app.controller('CommentController', ['$firebaseAuth', '$http', '$location', 'DataFactory', '$routeParams', function($firebaseAuth, $http, $location, DataFactory, $routeParams){


  var self = this;
  var auth = $firebaseAuth();
  var firebaseUser = auth.$getAuth();


//shows all comments from BD to view
  self.commentsObject = DataFactory.commentsObject;
  self.allSubcommentsObject = DataFactory.allSubcommentsObject;
  self.getIdeaIdObject = DataFactory.getIdeaIdObject;
console.log('getIdeaIdObject:',self.getIdeaIdObject);
//two lines below do data request to DB for specific idea ID
  var subtopicIdea = $routeParams;
  DataFactory.getIdeaId(subtopicIdea);

// console.log('subtopicIdeas:',self.subtopicIdeas);
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
//shows and hides sun-comment text area
  self.showComment = false;
//sub-comment button click function
  self.showCommentArea = function(){
    console.log("button clicked");
    self.showComment = true;
  }
//button click to add new sub-comment
  self.addNewSubComment = function(newSubComment, req){
//empties sub-comment text area on submit
    self.newSubComment = {};
    DataFactory.addNewSubComment(newSubComment);
  }//end of addNewSubComment()

}]);//end of app.controller()
