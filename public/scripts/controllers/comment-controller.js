
app.controller('CommentController', ['$firebaseAuth', '$http', '$location', 'DataFactory', '$routeParams', '$route', '$window', function($firebaseAuth, $http, $location, DataFactory, $routeParams, $route, $window){

  var self = this;
  var auth = $firebaseAuth();
  var firebaseUser = auth.$getAuth();
  var subtopicIdea = $routeParams;

  //come form DB
  self.getIdeaIdObject = DataFactory.getIdeaIdObject;
  self.getCommentIdObject = DataFactory.getCommentIdObject;
  self.commentsObject = DataFactory.commentsObject;
  self.addCommentLike = DataFactory.addCommentLike;
  self.addIdeaLike = DataFactory.addIdeaLike;
  self.addIdeaLove = DataFactory.addIdeaLove;

  DataFactory.getAllSubcomments();
  DataFactory.getComments(subtopicIdea);
  DataFactory.getIdeaId(subtopicIdea);



  //shows all comments from BD to view
  self.commentsObject = DataFactory.commentsObject;
  self.allSubcommentsObject = DataFactory.allSubcommentsObject;

  //*****************************************//
  //            COMMENT CREATION             //
  //*****************************************//
  //adds new comment to DB (need to add firebase id into the line below)
  self.addComment = function(comment) {
    //checks to see if user in logged in
    if (firebaseUser === null){
      swal("Sorry, we couldn't process your request.  You must be logged in!", "Try Again!", "error");
    }

    var newComment = {
      description : comment.description,
      idea_id : subtopicIdea.id
    }

    //sents comment from view to DB
    DataFactory.addComment(newComment);
    //reloads entire page after comment submission
    $window.location.reload();

    // empties inputs after submission
    self.comment = {};

  }//end of self.addComment()

  //*****************************************//
  //           SUBCOMMENT CREATION           //
  //*****************************************//
  //shows and hides sun-comment text area
  self.showComment = false;
  self.showCommentArea = function(comments){
    console.log("comments ", comments);
    self.showComment = true;
  }

  //button click to add new sub-comment (need to add firebase id into the line below)
  self.addNewSubComment = function(subComment){
    var firebaseUser = auth.$getAuth();
    var userMatchObject = DataFactory.userMatchObject.list;
    //container to loop id's through
    var id = "";
    //loops through all users email to find correct id
    for (var i = 0; i < userMatchObject.length; i++) {
      if (userMatchObject[i].email == firebaseUser.email) {
        var id = userMatchObject[i].id;
      }//end of if
    };//end of for loop

    var newSubComment = {
      description : subComment.description,
      comment_id : "257",//this is where im stuck
      user_id : id
    }

    DataFactory.addNewSubComment(newSubComment);
    //empties sub-comment text area on submit
    self.subComment = {};
    $window.location.reload();
  }//end of addNewSubComment()


}]);//end of app.controller()
