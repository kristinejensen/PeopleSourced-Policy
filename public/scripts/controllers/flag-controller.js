app.controller('FlagController', ['$firebaseAuth', '$http', '$location', 'DataFactory', function($firebaseAuth, $http, $location, DataFactory){

  var self = this;
  var auth = $firebaseAuth();


  auth.$onAuthStateChanged(getUser);

  //populates user profile information on page load
  function getUser(){
    var firebaseUser = auth.$getAuth();
    if(firebaseUser) {
      firebaseUser.getToken().then(function(idToken){
        $http({
          method: 'GET',
          url: '/data/user',
          headers: {
            id_token: idToken
          }
        }).then(function(response){
          self.userProfile = response.data;
          console.log(self.userProfile);

        })
      })
    } else {
      console.log('Not logged in or not authorized.');
    }
  };


  function getIdea(){
    var firebaseUser = auth.$getAuth();
    if(firebaseUser) {
      firebaseUser.getToken().then(function(idToken){
        $http({
          method: 'GET',
          url: '/data/idea',
          headers: {
            id_token: idToken
          }
        }).then(function(response){
          self.idea = response.data;
        })
      })
    } else {
      console.log('Not logged in or not authorized.');
    }
  };

  self.logOut = function(){
    auth.$signOut().then(function(){
      console.log('Logging the user out!');
      self.redirectHome();
    });
  };

  // function to redirect user to home page after logout
  self.redirectHome = function(){
    $location.url('/home');
  }

  //accesses information from public API
  self.idea = DataFactory.idea;
  self.comments = DataFactory.comments;

}]);
