app.controller('AdminManageUsersController', ['$http', '$location', 'DataFactory', function($http, $location, DataFactory){
  var self = this;

  self.allUsers = DataFactory.allUsers;

  self.deactivateUser = function(userId) {
    DataFactory.deactivateUser(userId);
  };

  self.reactivateUser = function(userId) {
    DataFactory.reactivateUser(userId);
  };

  self.filterList = DataFactory.filterList;

  self.searchUsers = DataFactory.searchUsers;

  self.userFilter = DataFactory.userFilter;

  self.userResults = DataFactory.userResults;

}]); //end of controller
