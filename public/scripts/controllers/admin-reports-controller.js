app.controller('AdminReportsController', ['$firebaseAuth','$http', '$location', function($firebaseAuth, $http, $location){
  var self = this;
  var auth = $firebaseAuth();
  //
  // self.logIn = function(){
  //   auth.$signInWithPopup("google").then(function(firebaseUser) {
  //     console.log("Firebase Authenticated as: ", firebaseUser.user.displayName);
  //   }).catch(function(error) {
  //     console.log("Authentication failed: ", error);
  //   });
  // };
  //
  // auth.$onAuthStateChanged(function(firebaseUser){
  //   if(firebaseUser) {
  //     self.redirectToVolunteerProfile();
  //   } else {
  //     console.log('Not logged in or not authorized.');
  //   }
  // });
  //
  // self.redirectToVolunteerProfile = function(){
  //   $location.url('/home');
  // }
  //

}]);
