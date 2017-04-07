app.factory('DataFactory', ['$http', function($http){
  var idea = {list: []};
  var comments = {list: []};
  var users = {details: {}};



  function getIdea(){

        $http({
          method: 'GET',
          url: '/pspData/idea'
        }).then(function(response){
          idea.list = response.data;
        })
  };


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
    idea:idea

  }

}]); // end of app.factory
