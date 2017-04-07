app.controller('LoginController', ['$firebaseAuth','$http', '$location', function($firebaseAuth, $http, $location){
  var self = this;

  //redirect after authentication
  function wrapView() {
    $location.path('/login');
  }//wrapView()

//google authenticate bellow
  var auth = $firebaseAuth();
//notyf must have
  // var notyf = new Notyf();

//google login authentication
  self.login = function(){
    console.log("login clicked");
    auth.$signInWithPopup("google").then(function(firebaseUser) {
      wrapView();
        // notyf.confirm('You Are Logged In');
        swal("You Are Logged In", "", "success");
        console.log("Firebase Authenticated as: ", firebaseUser.user.displayName);
        console.log(firebaseUser.user.email)
        self.photo = firebaseUser.user.photoURL;
        self.email = firebaseUser.user.email;
        //console.log("Firebase Authenticated as: ", firebaseUser.user.email);
    }).catch(function(error) {
        console.log("Authentication failed: ", error);
    });
  };//end of self.authUser()

//google de-authedicate
  self.logout = function(){
    console.log("logout clicked");
    auth.$signOut().then(function() {
        swal("You've Logged Out!", "", "success");
        console.log('Logging the user out!');
     });
  };//end of self.deAuthUser()




}]);
