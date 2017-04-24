app.controller('AdminFlaggedController', ['$firebaseAuth','$http', '$location',"$routeParams",'AdminFactory', function($firebaseAuth, $http, $location,$routeParams,AdminFactory){
  var self = this;
  var auth = $firebaseAuth();
self.ideaToFlagObject = AdminFactory.ideaToFlagObject;
self.allUsers = AdminFactory.allUsers;

self.deleteFlaggedItem = function(flags) {

  AdminFactory.deleteFlaggedItem(flags);
};

self.deleteItem = function(flags) {
console.log("this is the flag on delete item",flags);
  AdminFactory.deleteItem(flags);
};

self.updateFlaggedItem = function(flags) {
  console.log(flags);
  AdminFactory.updateFlaggedItem (flags);
};
// self.getAllFlaggedItems = function(){
//   AdminFactory.getAllFlaggedItems();
// }

AdminFactory.getAllFlaggedItems();



}]);
