app.controller('CommentController', ['$firebaseAuth', '$http', '$location', 'DataFactory', function($firebaseAuth, $http, $location, DataFactory){

  var self = this;

  //ARRI'S CODE STARTS HERE
  self.showComment = false;

   self.showCommentArea = function(){
     console.log("button clicked");
     self.showComment = true;
   }
   //ARRI'S CODE ENDS HERE

   //CHRIS'S CODE STARTS HERE
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
   //CHRIS'S CODE ENDS HERE

   //JEREMY'S CODE STARTS HERE

   //JEREMY'S CODE ENDS HERE

   //KRIS'S CODE STARTS HERE

   //KRIS'S CODE ENDS HERE

  // var auth = $firebaseAuth();
  // auth.$onAuthStateChanged(getUser);
  //
  // //populates user profile information on page load
  // function getUser(){
  //   var firebaseUser = auth.$getAuth();
  //   if(firebaseUser) {
  //     firebaseUser.getToken().then(function(idToken){
  //       $http({
  //         method: 'GET',
  //         url: '/data/user',
  //         headers: {
  //           id_token: idToken
  //         }
  //       }).then(function(response){
  //         self.userProfile = response.data;
  //         console.log(self.userProfile);
  //
  //       })
  //     })
  //   } else {
  //     console.log('Not logged in or not authorized.');
  //   }
  // };
  // function that logs user out on button click
  // self.logOut = function(){
  //   auth.$signOut().then(function(){
  //     console.log('Logging the user out!');
  //     self.redirectHome();
  //   });
  // };
  //
  // // function to redirect user to home page after logout
  // self.redirectHome = function(){
  //   $location.url('/home');
  // }
}]);//end of app.controller()
