app.controller('HomeController', ['DataFactory', '$firebaseAuth', '$location', function(DataFactory, $firebaseAuth, $location){
  var self = this;

//redirect to add adea view
self.createIdea = function () {
  $location.url('/idea');
}



}]);
