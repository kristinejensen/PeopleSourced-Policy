app.factory('TopicsFactory', ['$http', '$firebaseAuth', function($http, $firebaseAuth){
  //********************************************//
  //         UPDATE CURRENT MAIN TOPIC          //
  //********************************************//
  var mainTopic = {list: []};



  // var auth = $firebaseAuth();

  function updateTopic(title, description, id){
    var auth = $firebaseAuth();
    var firebaseUser = auth.$getAuth()
    if(firebaseUser){
      firebase.auth().currentUser.getToken().then(function(idToken) {
        var mainTopic = {title: title, description: description, id: id}
        $http({
          method: 'PUT',
          url: '/admin-topics/updateActiveTopic',
          headers: {
            id_token: idToken
          },
          data: mainTopic
        }).then(function(response) {
          findActiveTopic();
        });
      });
    } else {
      mainTopic.list = [];
    }
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

  function findUpcomingTopic(){
    var auth = $firebaseAuth();
    var firebaseUser = auth.$getAuth();
    if(firebaseUser){
      firebase.auth().currentUser.getToken().then(function(idToken) {
        $http({
          method:'GET',
          url: '/admin-topics/findUpcomingTopic',
          headers: {
            id_token: idToken
          }
        }).then(function(response){
          upcomingMainTopic.list = response.data[0];
          if (upcomingMainTopic.list == undefined){
            noUpcomingTopic.list = true;
          } else if (upcomingMainTopic.list !== undefined){
            noUpcomingTopic.list = false;
          }
        });
      });
    }
  }

  function updateUpcomingTopic(title, description, id){
    var auth = $firebaseAuth();
    var firebaseUser = auth.$getAuth();
    if(firebaseUser){
      firebase.auth().currentUser.getToken().then(function(idToken) {
        var mainTopic = {title: title, description: description, id: id}
        $http({
          method: 'PUT',
          url: '/admin-topics/updateUpcomingTopic',
          headers: {
            id_token: idToken
          },
          data: mainTopic
        }).then(function(response) {
          findUpcomingTopic();
        })
      });
    }
  }

  function addUpcomingTopic(title, description){
    var auth = $firebaseAuth();
    var firebaseUser = auth.$getAuth()
    if(firebaseUser){
      firebase.auth().currentUser.getToken().then(function(idToken) {
        var mainTopic = {title: title, description: description}
        $http({
          method:'PUT',
          url: '/admin-topics/addUpcomingTopic',
          headers: {
            id_token: idToken
          },
          data: mainTopic
        }).then(function(response){
          findUpcomingTopic();
        });
      });
    }
  }

  //********************************************//
  //        SET NEW CURRENT MAIN TOPIC          //
  //********************************************//

  //*********************************************//
  //           UPDATE CURRENT SUBTOPICS          //
  //*********************************************//
  var subTopic = {list: []};


  // function findSpecificSubTopic(id){
  //   $http({
  //     method:'GET',
  //     url: '/public/findSpecificSubTopic',
  //     // headers: id
  //   }).then(function(response){
  //     specificSubTopic.list = response.data;
  //     console.log('Specific Subtopic at factory in http: ', specificSubTopic);
  //   });
  // }

  function updateSubTopic(title, description, id){
    var auth = $firebaseAuth();
    var firebaseUser = auth.$getAuth()
    if(firebaseUser){
      firebase.auth().currentUser.getToken().then(function(idToken) {
        var subTopic = {title: title, description: description, id: id}
        $http({
          method: 'PUT',
          url: '/admin-topics/updateActiveSubTopics',
          headers: {
            id_token: idToken
          },
          data: subTopic
        }).then(function(response) {
          findActiveSubTopics();
        })
      });
    }
  }

  function findActiveSubTopics(){
    $http({
      method:'GET',
      url: '/public/findActiveSubTopics'
    }).then(function(response){
      subTopic.list = response.data;
    });
  }
  //*********************************************//
  //          UPDATE UPCOMING SUBTOPICS          //
  //*********************************************//
  var upcomingSubTopic = {list: []};


  function updateUpcomingSubTopic(title, description, id){
    var auth = $firebaseAuth();
    var firebaseUser = auth.$getAuth()
    if(firebaseUser){
      firebase.auth().currentUser.getToken().then(function(idToken) {
        var subTopic = {title: title, description: description, id: id}
        $http({
          method: 'PUT',
          url: '/admin-topics/updateUpcomingSubTopics',
          headers: {
            id_token: idToken
          },
          data: subTopic
        }).then(function(response) {
          findUpcomingSubTopics();
        })
      });
    }
  }

  function addUpcomingSubTopic(title, description){
    var auth = $firebaseAuth();
    var firebaseUser = auth.$getAuth()
    if(firebaseUser){
      firebase.auth().currentUser.getToken().then(function(idToken) {
        var subTopic = {title: title, description: description}
        $http({
          method: 'POST',
          url: '/admin-topics/addUpcomingSubTopics',
          headers: {
            id_token: idToken
          },
          data: subTopic
        }).then(function(response) {
          findUpcomingSubTopics();
        })
      });
    }
  }

  function findUpcomingSubTopics(){
    var auth = $firebaseAuth();
    var firebaseUser = auth.$getAuth()
    if(firebaseUser){
      firebase.auth().currentUser.getToken().then(function(idToken) {
        $http({
          method:'GET',
          url: '/admin-topics/findUpcomingSubTopics',
          headers: {
            id_token: idToken
          }
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
      });
    }
  }
  //*********************************************//
  //          SET NEW CURRENT SUBTOPICS          //
  //*********************************************//
  function init(){
    findActiveTopic();
    findUpcomingTopic();
    findActiveSubTopics();
    findUpcomingSubTopics();
  }

  findActiveTopic();
  findUpcomingTopic();
  findActiveSubTopics();
  findUpcomingSubTopics();
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
    //init
    init: init
  }

}]); // end of app.factory
