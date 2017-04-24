app.controller('AdminFlaggedController', ['$firebaseAuth','$http', '$location',"$routeParams",'AdminFactory', function($firebaseAuth, $http, $location,$routeParams,AdminFactory){
  var self = this;
  var auth = $firebaseAuth();

  auth.$onAuthStateChanged(function(firebaseUser) {
    console.log('auth state changed');
    if (firebaseUser) {
      AdminFactory.getAllFlaggedComments();
      self.commentToFlagObject = AdminFactory.commentToFlagObject;
      AdminFactory.getAllFlaggedIdeas();
      self.ideaToFlagObject = AdminFactory.ideaToFlagObject;
    } else {

    }
  });

  self.deleteFlaggedItem = function(flags) {
    AdminFactory.deleteFlaggedItem(flags);
  };

  self.deleteItem = function(flags) {
    AdminFactory.deleteItem(flags);
  };

  self.updateFlaggedItem = function(flags) {
    AdminFactory.updateFlaggedItem (flags);
  };

}]);
