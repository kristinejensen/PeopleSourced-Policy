app.factory('DataFactory', ['$http', function($http){
  // var idea = {list: []};
  // var comments = {list: []};
  var allUsers = {list: []};
  var ideaFlags = {};

  init();

  //startup functions
  function init() {
    getUsers();
  }

  //function to display user list on manage users admin view
  function getUsers() {
    $http({
      method: 'GET',
      url: '/admin/manageUsers'
    }).then(function(response){
      allUsers.list = response.data;
      console.log(allUsers.list);
      for (var i = 0; i < allUsers.list.length; i++) {
        if(allUsers.list[i].ideas_flags_count == null){
          allUsers.list[i].ideas_flags_count = 0;
        }
        if(allUsers.list[i].comments_flags_count == null){
          allUsers.list[i].comments_flags_count = 0;
        }
        if(allUsers.list[i].subflags_count == null){
          allUsers.list[i].subflags_count = 0;
        }
      }
    })
  }

//function to deactivate user profile
  function deactivateUser(userId) {
    swal({
      title: 'Deactivate User',
      text: "Are you sure you want to deactivate this user?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, I\'m sure'
    }).then(function() {
      $http({
        method: 'PUT',
        url: '/admin/deactivateUser/' + userId
      }).then(function(response) {
        console.log('user marked as inactive');
        swal(
          'Success',
          'The user has been deactivated.',
          'success'
        )
        init();
      });
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
    allUsers: allUsers,
    deactivateUser: deactivateUser
  }

}]); // end of app.factory
