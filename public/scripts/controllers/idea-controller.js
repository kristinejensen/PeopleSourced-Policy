app.controller('IdeaController', ['DataFactory', '$firebaseAuth', function(DataFactory, $firebaseAuth) {
  var self = this;

  var auth = $firebaseAuth();

  function homeView() {
    $location.path('/home');
  }

}]);
