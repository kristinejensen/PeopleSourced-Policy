app.controller('AdminTopicsController', ['$http', '$location', 'AdminFactory', function($http, $location, AdminFactory){
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

  self.mainTopic = AdminFactory.mainTopic;

  self.updateTopic = function(title, description, id) {
   AdminFactory.updateTopic(title, description, id);
 };

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


}]);
