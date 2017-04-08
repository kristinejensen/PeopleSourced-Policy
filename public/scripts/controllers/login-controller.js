app.controller('LoginController', ['DataFactory', '$firebaseAuth','$http', '$location', function(DataFactory, $firebaseAuth, $http, $location){
  var self = this;

//notyf must have
  // var notyf = new Notyf();

//google authenticate bellow
  var auth = $firebaseAuth();

//redirection after login
  function loginView() {
    $location.path('/login');
  }

//redirection after logout
  function logoutView() {
    $location.path('/home');
  }

//user google login authentication
  self.login = function() {
        console.log("login clicked");
    auth.$signInWithPopup("google").then(function(firebaseUser) {
      loginView();
        // notyf.confirm('You Are Logged In');
        // swal("You Are Logged In", "", "success");
        self.photo = firebaseUser.user.photoURL;
        self.email = firebaseUser.user.email;
          // console.log("Firebase Authenticated as: ", firebaseUser.user.displayName);
          console.log("Firebase Authenticated as: ", firebaseUser.user.email);
    }).catch(function(error) {
        console.log("Authentication failed: ", error);
    });
  };//end of self.authUser()

//user google logout de-authedicate
  self.logout = function() {
          console.log("logout clicked");
    auth.$signOut().then(function() {
      logoutView()
        // swal("You've Logged Out!", "", "success");
          console.log('Logging the user out!');
    });
  };//end of self.deAuthUser()

//new user object from view button click
  self.addNewUser = function(newUser) {
    //console.log(newUser)
    DataFactory.addNewUser(newUser)
    self.newUser = {}
  }


}]);//enf of app.controller()
