app.controller('NavCtrl', ['$firebaseAuth', '$http', '$location', 'TopicsFactory', function($firebaseAuth, $http, $location, TopicsFactory){
  // var self = this;
  // var self = this;
  // var auth = $firebaseAuth();
  //loads the active subtopics onto the nav.
  TopicsFactory.findActiveSubTopics();
  //Here is the result/active subtopics
  self.subTopic = TopicsFactory.subTopic;
  //sets the currently selected nav to a different class/color
  this.isActive = function (viewLocation) {
    return viewLocation === $location.path();
  };

  // TopicsFactory.checkAdminStatus();
  // self.isAdmin = TopicsFactory.isAdmin;

  // auth.$onAuthStateChanged(function(firebaseUser) {
  //   TopicsFactory.checkAdminStatus();
  //   self.isAdmin = TopicsFactory.isAdmin;
  //   if(firebaseUser){
  //
  //   }
  // });

}]);
