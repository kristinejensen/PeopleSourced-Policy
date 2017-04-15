app.factory('AdminFactory', ['$http', function($http){
  //==============================//
  // Adding or Updating Topics    //
  //==============================//

//find active topic and update with the id of the active topic.
//if no active topic, create a new topic.

//subtopic array?

// subTopics = { list: [subtopic1: '', subtopic2: '', subtopic3: '', subtopic4: '', subtopic5: ''] }

// function updateTopic(){
//
// //check database to see if there is a current/active topic
//   //If there is a current/active topic, update it
//   //If there is NOT a current topic, create one with this data and set it as active
//
//   mainTopic = {
//     self.mainTopicTitle = '',
//     self.mainTopicDesc = '',
//   }
//
//
//   $http({
//     method: 'GET',
//     url: '/admin-topics/findCurrentTopic'
//   }).then(function(response) {
//     console.log(response);
//   });
// }
  //==============================//
  //             API              //
  //==============================//
  return {
    //
    // addTopic : addTopic,
    // //
    // updateTopic : updateTopic,
    //
  }

}]); // end of app.factory
