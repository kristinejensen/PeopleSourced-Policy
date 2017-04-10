app.controller('AdminManageUsersController', ['$http', '$location', 'DataFactory', function($http, $location, DataFactory){
  var self = this;

  self.allUsers = DataFactory.allUsers

  self.deleteUser = function(userId) {
     DataFactory.deleteUser(userId);
   }

}]); //end of controller
