app.factory('TopicsFactory', ['$http', function($http){
  //********************************************//
  //         UPDATE CURRENT MAIN TOPIC          //
  //********************************************//
  var mainTopic = {list: []};

  findActiveTopic();

  function updateTopic(title, description, id){
    var mainTopic = {title: title, description: description, id: id}
    $http({
      method: 'PUT',
      url: '/admin-topics/updateActiveTopic',
      data: mainTopic
    }).then(function(response) {
      findActiveTopic();
    })
  }

  function findActiveTopic(){
    $http({
      method:'GET',
      url: '/public/findActiveTopic'
    }).then(function(response){
      mainTopic.list = response.data[0];
    });
  }
  //********************************************//
  //        ADD/UPDATE UPCOMING MAIN TOPIC      //
  //********************************************//
  var upcomingMainTopic = {list: []};
  var noUpcomingTopic = {list: []};
  findUpcomingTopic();

  function findUpcomingTopic(){
    $http({
      method:'GET',
      url: '/admin-topics/findUpcomingTopic'
    }).then(function(response){
      upcomingMainTopic.list = response.data[0];
      if (upcomingMainTopic.list == undefined){
        noUpcomingTopic.list = true;
      } else if (upcomingMainTopic.list !== undefined){
        noUpcomingTopic.list = false;
      }
    });
  }

  function updateUpcomingTopic(title, description, id){
    var mainTopic = {title: title, description: description, id: id}
    $http({
      method: 'PUT',
      url: '/admin-topics/updateUpcomingTopic',
      data: mainTopic
    }).then(function(response) {
      findUpcomingTopic();
    })
  }

  function addUpcomingTopic(title, description){
    var mainTopic = {title: title, description: description}
    $http({
      method:'PUT',
      url: '/admin-topics/addUpcomingTopic',
      data: mainTopic
    }).then(function(response){
      findUpcomingTopic();
    });
  }

  //********************************************//
  //        SET NEW CURRENT MAIN TOPIC          //
  //********************************************//

  //*********************************************//
  //           UPDATE CURRENT SUBTOPICS          //
  //*********************************************//
  var subTopic = {list: []};
  var specificSubTopic = {list: []};

  findActiveSubTopics();

  // findSpecificSubTopic(id);

  function findSpecificSubTopic(id){
    $http({
      method:'GET',
      url: '/public/findSpecificSubTopic',
      // headers: id
    }).then(function(response){
      specificSubTopic.list = response.data;
    });
  }

  function updateSubTopic(title, description, id){
    var subTopic = {title: title, description: description, id: id}
    $http({
      method: 'PUT',
      url: '/admin-topics/updateActiveSubTopics',
      data: subTopic
    }).then(function(response) {
      findActiveSubTopics();
    })
  }

  function findActiveSubTopics(){
    $http({
      method:'GET',
      url: '/admin-topics/findActiveSubTopics'
    }).then(function(response){
      subTopic.list = response.data;
    });
  }
  //*********************************************//
  //          UPDATE UPCOMING SUBTOPICS          //
  //*********************************************//
  var upcomingSubTopic = {list: []};

  findUpcomingSubTopics();

  function updateUpcomingSubTopic(title, description, id){
    var subTopic = {title: title, description: description, id: id}
    $http({
      method: 'PUT',
      url: '/admin-topics/updateUpcomingSubTopics',
      data: subTopic
    }).then(function(response) {
      findUpcomingSubTopics();
    })
  }

  function addUpcomingSubTopic(title, description){
    var subTopic = {title: title, description: description}
    $http({
      method: 'POST',
      url: '/admin-topics/addUpcomingSubTopics',
      data: subTopic
    }).then(function(response) {
      findUpcomingSubTopics();
    })
  }

  function findUpcomingSubTopics(){
    $http({
      method:'GET',
      url: '/admin-topics/findUpcomingSubTopics'
    }).then(function(response){
      if(response.data.length < 5){
        while (response.data.length < 5) {
          response.data.push({noSubTopic: true});
          upcomingSubTopic.list = response.data;
        }
      }else {
      upcomingSubTopic.list = response.data;
      }
    });
  }
  //*********************************************//
  //          SET NEW CURRENT SUBTOPICS          //
  //*********************************************//

  //*********************************************//
  //                     API                     //
  //*********************************************//
  return {
    //the current mainTopic
    mainTopic : mainTopic,
    //next tri's main topic
    upcomingMainTopic : upcomingMainTopic,
    //if next tri doesn't have a main topic yet
    noUpcomingTopic : noUpcomingTopic,
    //add a new upcoming topic,
    addUpcomingTopic : addUpcomingTopic,
    //the current subtopics
    subTopic : subTopic,
    //the upcoming subtopics
    upcomingSubTopic : upcomingSubTopic,
    //updates the main topic
    updateTopic : updateTopic,
    //updates the next tri main topic
    updateUpcomingTopic : updateUpcomingTopic,
    //updates the sub topics
    updateSubTopic : updateSubTopic,
    //updates the upcoming sub topics
    updateUpcomingSubTopic : updateUpcomingSubTopic,
    //adding a new upcoming sub topic
    addUpcomingSubTopic : addUpcomingSubTopic,
    //find subtopic for subtopic page
    findSpecificSubTopic : findSpecificSubTopic,
  }

}]); // end of app.factory
