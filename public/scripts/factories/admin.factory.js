
app.factory('AdminFactory', ['$http', '$firebaseAuth', function($http, $firebaseAuth){

  var allUsers = {list: []};
  var filterList = {list: []};
  var userFilter = {};
  var userResults = {list: []};
  var ideaToFlagObject = {list: []};
  var commentToFlagObject = {list: []};

  // init(); //run

  //startup functions
  function init() {
    getUsers();
    filterUsers();
  }

  //function to display user list on manage users admin view
  function getUsers() {
    var auth = $firebaseAuth();
    var firebaseUser = auth.$getAuth();
    if(firebaseUser){
      firebase.auth().currentUser.getToken().then(function(idToken) {
        $http({
        method: 'GET',
        url: '/admin/manageUsers',
        headers: {
          id_token: idToken
        }
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
    });
  }
}

  //function to deactivate user profile
  function deactivateUser(userId) {
    var auth = $firebaseAuth();
    var firebaseUser = auth.$getAuth();
      if(firebaseUser){
        firebase.auth().currentUser.getToken().then(function(idToken) {
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
              url: '/admin/deactivateUser/' + userId,
              headers: {
                id_token: idToken
              }
            }).then(function(response) {
              console.log('user marked as inactive');
              init();
            });
          })
        });
      }
  }

  //function to reactivate user profile
  function reactivateUser(userId) {
    var auth = $firebaseAuth();
    var firebaseUser = auth.$getAuth()
      if(firebaseUser){
        firebase.auth().currentUser.getToken().then(function(idToken) {
          console.log('reactivate user button clicked');
          console.log(userId);
          swal({
            title: 'Reactivate User',
            text: "Are you sure you want to reactivate this user?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, I\'m sure'
          }).then(function() {
            $http({
              method: 'PUT',
              url: '/admin/reactivateUser/' + userId,
              headers: {
                id_token: idToken
              }
            }).then(function(response) {
              console.log('user marked as active');
              init();
            });
          })
        });
      }
  }

  //function to filter user search on admin manage users view
  function filterUsers() {
    var auth = $firebaseAuth();
    var firebaseUser = auth.$getAuth()
      if(firebaseUser){
        firebase.auth().currentUser.getToken().then(function(idToken) {
          $http({
            method: 'GET',
            url: '/admin/filterUsers',
            headers: {
              id_token: idToken
            }
          }).then(function(response){
            filterList.list = response.data;
            console.log('filterList', filterList.list);
          })
        });
      }
  }

  //function to search users on admin manage users view
  function searchUsers() {
    var auth = $firebaseAuth();
    var firebaseUser = auth.$getAuth()
      if(firebaseUser){
        firebase.auth().currentUser.getToken().then(function(idToken) {
          $http({
            method: 'GET',
            url: '/admin/searchUsers',
            headers: {
              id_token: idToken,
              searchString: userFilter.searchString,
              filter: userFilter.filter.filter
            }
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
        });
      }
  }

  // getAllFlaggedItems();

  function getAllFlaggedComments() {
  console.log("gets all flags");
  var auth = $firebaseAuth();
  var firebaseUser = auth.$getAuth();
  if(firebaseUser){
    firebase.auth().currentUser.getToken().then(function(idToken) {
      $http({
        method: 'GET',
        url: '/admin/allCommentFlags',
        headers: {
          id_token: idToken
        }
        // headers:flagObject
      }).then(function(response) {
        commentToFlagObject.list = response.data;
        console.log("this is the response from get all flags",response.data);
      });
    });
  }
}//end of getComments()

function getAllFlaggedIdeas() {
console.log("gets all flags");
var auth = $firebaseAuth();
var firebaseUser = auth.$getAuth();
if(firebaseUser){
  firebase.auth().currentUser.getToken().then(function(idToken) {
    $http({
      method: 'GET',
      url: '/admin/allIdeaFlags',
      headers: {
        id_token: idToken
      }
      // headers:flagObject
    }).then(function(response) {
      ideaToFlagObject.list = response.data;
      console.log("this is the response from get all flags",response.data);
    });
  });
}
}//end of getComments()

function deleteItemComment(flag) {
console.log("gets all flags", flag);
var auth = $firebaseAuth();
var firebaseUser = auth.$getAuth();
if(firebaseUser){
  firebase.auth().currentUser.getToken().then(function(idToken) {
    $http({
      method: 'DELETE',
      url: '/admin/deleteFlaggedComment/' + flag.comment_id,
      headers: {
        id_token: idToken,
      }
    }).then(function(response) {
    });
  });
}
}//end of getComments()

function deleteItemIdea(flag) {
console.log("gets all flags", flag);
var auth = $firebaseAuth();
var firebaseUser = auth.$getAuth();
if(firebaseUser){
  firebase.auth().currentUser.getToken().then(function(idToken) {
    $http({
      method: 'DELETE',
      url: '/admin/deleteFlaggedIdea/' + flag.comment_id,
      headers: {
        id_token: idToken,
      }
    }).then(function(response) {
    });
  });
}
}//end of getComments()

  return {
    allUsers: allUsers,
    deactivateUser: deactivateUser,
    reactivateUser: reactivateUser,
    filterList: filterList,
    searchUsers: searchUsers,
    userFilter: userFilter,
    userResults: userResults,
    init: init,
    getAllFlaggedComments: getAllFlaggedComments,
    getAllFlaggedIdeas: getAllFlaggedIdeas,
    ideaToFlagObject: ideaToFlagObject,
    commentToFlagObject: commentToFlagObject,
    deleteItemIdea: deleteItemIdea,
    deleteItemComment: deleteItemComment,
  }

}]); // end of app.factory
