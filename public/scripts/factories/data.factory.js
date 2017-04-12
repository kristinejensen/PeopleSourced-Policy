app.factory('DataFactory', ['$http', function($http){
  // var idea = {list: []};
  // var comments = {list: []};
  var allUsers = {list: []};
  var userFilter = {list: []};

  init();

  //startup functions
  function init() {
    getUsers();
    filterUsers();
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

  //function to filter user search on admin filter users view
  function filterUsers() {
    $http({
      method: 'GET',
      url: '/admin/filterUsers'
    }).then(function(response){
      userFilter.list = response.data;
      console.log(userFilter.list);
    })
  }


  return {
    allUsers: allUsers,
    deactivateUser: deactivateUser,
    userFilter: userFilter
  }

}]); // end of app.factory
