app.controller('AdminManageUsersController', ['$http', '$location', 'AdminFactory', function($http, $location, AdminFactory){
  var self = this;

  var auth = $firebaseAuth();

  self.allUsers = AdminFactory.allUsers;

  self.deactivateUser = function(userId) {
    AdminFactory.deactivateUser(userId);
  };

  self.reactivateUser = function(userId) {
    AdminFactory.reactivateUser(userId);
  };

  self.filterList = AdminFactory.filterList;

  self.searchUsers = AdminFactory.searchUsers;

  self.userFilter = AdminFactory.userFilter;

  self.userResults = AdminFactory.userResults;

}]); //end of controller
