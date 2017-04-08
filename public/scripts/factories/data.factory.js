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

// //checks for admin rights
// function getAdmin() {
//   auth.$onAuthStateChanged(function(firebaseUser){
// //firebaseUser will be null if not logged in
//     if(firebaseUser) {
// //This is where we make our call to our server
//       firebaseUser.getToken().then(function(idToken){
//         $http({
//           method: 'GET',
//           url: '/login/admin',
//           headers: {
//             id_token: idToken
//           }
//         }).then(function(response){
//           var secretUser = response.data;
//         });
//       });
//     } else {
//       console.log('Not logged in or not authorized.');
//       var secretData = [];
//       console.log("secretData: ", secretData);
//     }
//   });//end of auth.$onAuthStateChanged
// }//end of getAdmin()





  return {
//new user object from add address button click
    addNewUser : addNewUser,

  }

}]); // end of app.factory
