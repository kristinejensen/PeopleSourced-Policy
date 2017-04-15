app.factory('AdminFactory', ['$http', function($http){
  //*******************//
  //                   //
  //    MAIN TOPIC     //
  //                   //
  //*******************//

  //***************************************//
  //         UPDATE CURRENT TOPIC          //
  //***************************************//
  var mainTopic = {list: []};

  console.log('admin factory main topic before', mainTopic);

  findActiveTopic();

  function updateTopic(title, description, id){
    var mainTopic = {title: title, description: description, id: id}
    $http({
      method: 'PUT',
      url: '/admin-topics/updateActiveTopic',
      data: mainTopic
    }).then(function(response) {
      findActiveTopic();
    })//Ends GET http
  }//Update topic function

  function findActiveTopic(){
    $http({
      method:'GET',
      url: '/admin-topics/findActiveTopic'
    }).then(function(response){
      console.log('WHAT IS THIS', response.data[0]);
      mainTopic.list = response.data[0];
      console.log('admin factory main topic in http', mainTopic);
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

  // findActiveSubTopics();
  //
  // self.updateSubTopic = function(title, description, id){
  //   console.log('was clicked');
  //   var subTopic = {title: title, description: description, id: id}
  //   //Find the active subtopic that matches the id.
  //   $http({
  //     method: 'PUT',
  //     url: '/admin-topics/updateActiveSubTopics',
  //     data: subTopic
  //   }).then(function(response) {
  //     console.log(response);
  //     findActiveSubTopics();
  //   })//Ends GET http
  // }//Update topic function
  //
  // function findActiveSubTopics(){
  //   $http({
  //     method:'GET',
  //     url: '/admin-topics/findActiveSubTopics'
  //   }).then(function(response){
  //     self.subtopicsArray = response.data;
  //   });
  // }
  //***************************************//
  //       SET NEW CURRENT SUBTOPICS       //
  //***************************************//



  //***************************************//
  //                  API                  //
  //***************************************//
  return {
    //
    mainTopic : mainTopic,
    updateTopic : updateTopic,
    findActiveTopic : findActiveTopic,
    //
  }

}]); // end of app.factory
