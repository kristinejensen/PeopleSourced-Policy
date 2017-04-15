app.controller('CommentController', ['$firebaseAuth', '$http', '$location', 'DataFactory', function($firebaseAuth, $http, $location, DataFactory){

  var self = this;

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


  //ARRI'S CODE STARTS HERE
  self.showComment = false;

  self.showCommentArea = function(){
    self.showComment = true;
  }

  //ARRI'S CODE ENDS HERE

  //CHRIS'S CODE STARTS HERE

  //CHRIS'S CODE ENDS HERE

  //JEREMY'S CODE STARTS HERE

  //JEREMY'S CODE ENDS HERE

  //KRIS'S CODE STARTS HERE

  //KRIS'S CODE ENDS HERE

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

  //accesses information from public API


}]);
