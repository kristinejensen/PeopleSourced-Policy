app.controller('AdminTopicsController', ['$http', '$location', function($http, $location){
  const self = this;
  console.log('admintopicscontroller working');

  //*******************//
  //                   //
  //    MAIN TOPIC     //
  //                   //
  //*******************//

  findActiveTopic();

  function findActiveTopic(){
    $http({
      method:'GET',
      url: '/admin-topics/findActiveTopic'
    }).then(function(response){
      console.log(response);
      self.mainTopicTitle = response.data[0].title;
      self.mainTopicDesc = response.data[0].description;
    });
  }

  self.updateTopic = function(title, description){
    var mainTopic = {title: title, description: description}
    //Find the current Active Topic
    $http({
      method: 'PUT',
      url: '/admin-topics/updateActiveTopic',
      headers: mainTopic
    }).then(function(response) {
      findActiveTopic();
    })//Ends GET http
  }//Update topic function

  //*******************//
  //                   //
  //    SUB TOPICS     //
  //                   //
  //*******************//

  // var auth = $firebaseAuth();
  //
  // self.logIn = function(){
  //   auth.$signInWithPopup("google").then(function(firebaseUser) {
  //     console.log("Firebase Authenticated as: ", firebaseUser.user.displayName);
  //   }).catch(function(error) {
  //     console.log("Authentication failed: ", error);
  //   });
  // };
  //
  // auth.$onAuthStateChanged(function(firebaseUser){
  //   if(firebaseUser) {
  //     self.redirectToVolunteerProfile();
  //   } else {
  //     console.log('Not logged in or not authorized.');
  //   }
  // });
  //
  // self.redirectToVolunteerProfile = function(){
  //   $location.url('/home');
  // }
}]);
