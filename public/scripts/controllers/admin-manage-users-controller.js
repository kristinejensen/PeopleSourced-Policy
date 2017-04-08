app.controller('AdminManageUsersController', ['$http', '$location', 'DataFactory',function($http, $location, DataFactory){
  var self = this;
  // var auth = $firebaseAuth();

  
  self.allUsers = DataFactory.allUsers




    // } else {
    //   console.log('Not logged in or not authorized.');
    // }
  // };


}]); //end of controller
