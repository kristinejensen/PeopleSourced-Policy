app.controller('AdminManageUsersController', ['$http', '$location', function($http, $location){
  var self = this;
  // var auth = $firebaseAuth();

  self.usersList = {};

  getUsers();

  function getUsers(){
    console.log('get users function is being called');
    // var firebaseUser = auth.$getAuth();
    // if(firebaseUser) {
    //   firebaseUser.getToken().then(function(idToken){
        $http({
          method: 'GET',
          url: '/admin/manageUsers'
          // headers: {
          //   id_token: idToken
          // }
        }).then(function(response){
          self.usersList = response.data;
          console.log(self.volunteerProfile);
        })
      }
    // } else {
    //   console.log('Not logged in or not authorized.');
    // }
  // };


}]); //end of controller
