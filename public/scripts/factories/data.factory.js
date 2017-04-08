app.factory('DataFactory', ['$http', function($http){
  // var idea = {list: []};
  // var comments = {list: []};
  var allUsers = { list : [] };


  init();

//startup functions
  function init() {
    getUsers();
  }


  function getUsers(){
    console.log('get users function is being called');
    // var firebaseUser = auth.$getAuth();
    // if(firebaseUser) {
    //   firebaseUser.getToken().then(function(idToken){
      $http({
        method: 'GET',
        url: '/admin/manageUsers'
        // headers: {          //   id_token: idToken
        // }
        }).then(function(response){
          allUsers.List = response.data;
          console.log(allUsers.List);

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
//object from DB going to view
    allUsers : allUsers


  }

}]); // end of app.factory
