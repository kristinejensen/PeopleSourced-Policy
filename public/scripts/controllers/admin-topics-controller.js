app.controller('AdminTopicsController', ['$http', '$location', function($http, $location){
  const self = this;
  console.log('admintopicscontroller working');

  //*******************//
  //                   //
  //    MAIN TOPIC     //
  //                   //
  //*******************//

  //***************************************//
  //         UPDATE CURRENT TOPIC          //
  //***************************************//

  findActiveTopic();

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
  //***************************************//
  //        SET NEW CURRENT TOPIC          //
  //***************************************//


  //*******************//
  //                   //
  //    SUB TOPICS     //
  //                   //
  //*******************//

  //***************************************//
  //        UPDATE CURRENT SUBTOPICS       //
  //***************************************//

  const maxSubtopics = 5;

  findActiveSubTopics();

  self.updateSubTopic = function(title, description, id){
    console.log('was clicked');
    var subTopic = {title: title, description: description, id: id}
    //Find the active subtopic that matches the id.
    $http({
      method: 'PUT',
      url: '/admin-topics/updateActiveSubTopics',
      data: subTopic
    }).then(function(response) {
      console.log(response);
      findActiveSubTopics();
    })//Ends GET http
  }//Update topic function

  function findActiveSubTopics(){
    $http({
      method:'GET',
      url: '/admin-topics/findActiveSubTopics'
    }).then(function(response){
      self.subtopicsArray = response.data;
    });
  }
  //***************************************//
  //       SET NEW CURRENT SUBTOPICS       //
  //***************************************//



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
