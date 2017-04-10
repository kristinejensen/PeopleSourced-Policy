app.controller('AdminManageUsersController', ['$http', '$location', 'DataFactory', function($http, $location, DataFactory){
  var self = this;

  self.allUsers = DataFactory.allUsers

  self.deactivateUser = function(userId) {
    console.log('deactivate button clicked');
    $http({
      method: 'PUT',
      url: '/admin/deactivateUser/' + userId
    }).then(function(response) {
      console.log('user marked as inactive');
    });
  }

}]); //end of controller
