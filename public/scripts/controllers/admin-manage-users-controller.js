app.controller('AdminManageUsersController', ['$http', '$location', 'DataFactory', function($http, $location, DataFactory){
  var self = this;
  console.log('the controller is running');

  self.allUsers = DataFactory.allUsers

  self.deleteUser = function(userId) {
     DataFactory.deleteUser(userId);
   }

}]); //end of controller
