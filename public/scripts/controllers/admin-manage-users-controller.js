app.controller('AdminManageUsersController', ['$http', '$location', 'DataFactory', function($http, $location, DataFactory){
  var self = this;

  self.allUsers = DataFactory.allUsers;

  self.deactivateUser = function(userId) {
   DataFactory.deactivateUser(userId);
 };

 self.filterList = DataFactory.filterList;

}]); //end of controller
