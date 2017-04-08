app.factory('DataFactory', ['$http', function($http){


//add new user to DB from button click
function addNewUser(newUser){
  firebase.auth().currentUser.getToken().then(function(idToken) {
      //adds blank to database from input view inputs
        $http({
          method: 'POST',
          url: '/login/newUser',
          data: newUser,
          headers: {
            id_token: idToken
          }
        }).then(function(response){
          // notyf.confirm('Blank Submitted For Approval');
          swal("User Added To Database", "", "success");
          self.newUser = {};
        }).catch(function(error) {
          swal("Values Are Incorrect", "Try Again!", "error");
          console.log('error authenticating', error);
        });
      });//end of firebase.auth()
}//end of addNewUser()










  return {
//new user object from add address button click
    addNewUser : addNewUser

  }

}]); // end of app.factory
