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

  self.deleteFlaggedComment = function(flags) {
    AdminFactory.deleteFlaggedComment(flags);
  };

  self.deleteItem = function(flags) {
    console.log(flags);
    AdminFactory.deleteItem(flags);
  };

  self.updateFlaggedItem = function(flags) {
    AdminFactory.updateFlaggedItem (flags);
  };

  self.deleteItemIdea = function(flag){
    AdminFactory.deleteItemIdea(flag);
  }
  self.deleteItemComment= function(flag){
    AdminFactory.deleteItemComment(flag);
  }

  self.resolveFlag = false;

  self.resolveFlags = function(){
    console.log('getsome');
    self.resolveFlag = true;
  }

}]);
