app.factory('DataFactory', ['$http', function($http){
  // var idea = {list: []};
  // var comments = {list: []};
  var allUsers = {list: []};

  init();

  //startup functions
  function init() {
    getUsers();
  }

  //function to display user list on manage users admin view
  function getUsers(){
    // var firebaseUser = auth.$getAuth();
    // if(firebaseUser) {
    //   firebaseUser.getToken().then(function(idToken){
    $http({
      method: 'GET',
      url: '/admin/manageUsers'
      // headers: {          //   id_token: idToken
      // }
    }).then(function(response){
      allUsers.list = response.data;
      console.log(allUsers.list);
    })
  }

  //function to delete user from manage users admin view
  function deleteUser(userId){
    console.log('the delete user button was clicked');
    console.log('the targeted user id is:', userId);
    // var firebaseUser = auth.$getAuth();
    // if(firebaseUser) {
    //   firebaseUser.getToken().then(function(idToken){
    $http({
      method: 'DELETE',
      url: '/admin/deleteUser/' + userId.id,
      data: userId
      // headers: {          //   id_token: idToken
      // }
    }).then(function(response){
      console.log('user successfull deleted from database');
    })
  }

  //
  //
  //
  //   self.sendEmail = function(){
  //     console.log('send email button clicked');
  //     console.log(self.currentVolunteer.details[0]);
  //     $http({
  //       method: 'POST',
  //       url: '/search/send',
  //       data: self.currentVolunteer.details[0]
  //     }).then(function(response){
  //       console.log(response);
  //       swal(
  //         'Success!',
  //         'Your email has been sent.',
  //         'success'
  //       );
  //       self.currentVolunteer.details[0].email = "";
  //       self.currentVolunteer.details[0].sender = "";
  //       self.currentVolunteer.details[0].subject = "";
  //       self.currentVolunteer.details[0].message = "";
  //     })
  // };
  //
  //   self.currentVolunteer=DataFactory.currentVolunteer;
  //   self.getVolunteer=DataFactory.getVolunteer($routeParams.id);
  //

  return {
    allUsers : allUsers,
    deleteUser: deleteUser
  }

}]); // end of app.factory
