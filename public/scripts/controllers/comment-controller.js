
app.controller('CommentController', ['$firebaseAuth', '$http', '$location', 'DataFactory', '$routeParams', function($firebaseAuth, $http, $location, DataFactory, $routeParams){

  var self = this;
  var auth = $firebaseAuth();
  var firebaseUser = auth.$getAuth();
// console.log("req.decodedToken.userSQLId ;", decodedToken.userSQLId);

  //shows all comments from BD to view(migth not need the two lines below)
  // self.commentsObject = DataFactory.commentsObject;
  // self.allSubcommentsObject = DataFactory.allSubcommentsObject;

  //come form DB
  self.getIdeaIdObject = DataFactory.getIdeaIdObject;
  self.getCommentIdObject = DataFactory.getCommentIdObject;
  DataFactory.getAllSubcomments();
  //shows all comments from BD to view
  self.commentsObject = DataFactory.commentsObject;
  self.allSubcommentsObject = DataFactory.allSubcommentsObject;
  //two lines below do data request to DB for specific idea ID
  var subtopicIdea = $routeParams;
  DataFactory.getIdeaId(subtopicIdea);

  // //redirects to home page
  // self.commentRedirect = function() {
  //   //redirect after submission
  //   $location.url('/home');
  // }//end of self.commentRedirect()
  // //Redirects to idea page.
  // self.createIdea = function() {
  //   //redirect after submission
  //   $location.path('/idea');
  // }
  // //redirect to comment page?
  // self.commentRedirect = function() {
  //   //redirect after submission
  //   $location.url('/comment');
  // }//end of self.commentRedirect()

  //  //adds new comment to DB
  //    self.addComment = function(newComment) {
  //  //sents comment from view to DB
  //      DataFactory.addComment(newComment);
  //  //empties inputs after submission
  //      self.newComment = {};
  //  //redirect after submission
  //      $location.url('/comment');
  //    }//end of self.addComment()

  //*****************************************//
  //            COMMENT CREATION             //
  //*****************************************//
  //adds new comment to DB (need to add firebase id into the line below)
  self.addComment = function(comment) {
    var newComment = {
      description : comment.description,
      idea_id : subtopicIdea.id
    }
    //sents comment from view to DB
    DataFactory.addComment(newComment);
    //empties inputs after submission
    self.comment = {};
    //redirect after submission - NOOOO
    // $location.url('/home');
  }//end of self.addComment()
  //*****************************************//
  //           SUBCOMMENT CREATION           //
  //*****************************************//
  //shows and hides sun-comment text area
  self.showComment = false;
  //sub-comment button click function
  self.showCommentArea = function(comments){
    console.log("comments ", comments);
    self.showComment = true;

  }

  //button click to add new sub-comment (need to add firebase id into the line below)
  self.addNewSubComment = function(subComment){

    var userMatchObject = DataFactory.userMatchObject.list;
//sources firebaseUser in the function
    var firebaseUser = auth.$getAuth();
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
      comment_id : "110",//this is where im stuck
      user_id : id
    }
    console.log(newSubComment);
    DataFactory.addNewSubComment(newSubComment);
//empties sub-comment text area on submit
    self.subComment = {};
  }//end of addNewSubComment()



}]);//end of app.controller()
